import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import WOW from "wowjs";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const useArtwork = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    style: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [animatedArtworks, setAnimatedArtworks] = useState([]);
  const [staticArtworks, setStaticArtworks] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [staticLoaded, setStaticLoaded] = useState(false);
  const staticRef = useRef(null);
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchArtworks = useCallback(async (style) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(
        `https://demo-project-backend-5u11.onrender.com/api/artworks/${style}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const artworks = response.data.map((artwork) => ({
        ...artwork,
        isLiked: artwork.isLiked || false, // Default to false if not provided
      }));
      style === "animated"
        ? setAnimatedArtworks(artworks)
        : setStaticArtworks(artworks);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("access_token");
        toast.error("Session expired. Please log in again.");
        window.location.href = "/signin";
      }
    }
  }, []);

  const likeArtwork = async (artworkId) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        `https://demo-project-backend-5u11.onrender.com/api/artworks/${artworkId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // Update likes for the artwork locally
        updateArtworkLikes(artworkId, response.data.likes);
        toast.success("You liked this artwork!");
      }
    } catch (error) {
      console.error("Error liking artwork:", error);
      toast.error("Could not like the artwork. Please try again.");
    if (error.response && error.response.status === 400) {
      toast.error("Invalid request. Please check the artwork or your session.");
    } else {
      toast.error("Could not like the artwork. Please try again.");
    }
  }
  };

  const unlikeArtwork = async (artworkId) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.delete(
        `https://demo-project-backend-5u11.onrender.com/api/artworks/${artworkId}/like`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        updateArtworkLikes(artworkId, response.data.likes);
        toast.info("You unliked this artwork!");
      }
    } catch (error) {
      handleArtworkError(error, "Could not unlike the artwork. Please try again.");
    }
  };

  const updateArtworkLikes = (artworkId, likes, likedByUser) => {
    setAnimatedArtworks((prev) =>
      prev.map((art) => (art.id === artworkId ? { ...art, likes, isLiked: likedByUser } : art))
    );
    setStaticArtworks((prev) =>
      prev.map((art) => (art.id === artworkId ? { ...art, likes, isLiked: likedByUser } : art))
    );
  };

  const handleArtworkError = (error, defaultMessage) => {
    console.error(defaultMessage, error);
    if (error.response?.status === 400) {
      toast.error("Invalid request. Please check the artwork or your session.");
    } else {
      toast.error(defaultMessage);
    }
  };

  useEffect(() => {
    const wowInstance = new WOW.WOW();
    wowInstance.init();

    fetchArtworks("animated");

    const handleScroll = () => setShowScrollToTop(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !staticLoaded) {
            fetchArtworks("static");
            setStaticLoaded(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentStaticRef = staticRef.current;
    if (currentStaticRef) observer.observe(currentStaticRef);

    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
      }
    }

    return () => {
      wowInstance.sync();
      window.removeEventListener("scroll", handleScroll);
      if (currentStaticRef) observer.unobserve(currentStaticRef);
    };
  }, [fetchArtworks, location.hash, staticLoaded]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    const token = localStorage.getItem("access_token");
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append("image", imageFile);

    try {
      const response = await axios.post(
        "https://demo-project-backend-5u11.onrender.com/api/artworks/submit",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      if (response.status === 201) {
        setSubmissionStatus("Artwork submitted successfully!");
        setFormData({ name: "", email: "", description: "", style: "" });
        setImageFile(null);
        fetchArtworks(formData.style);

        setTimeout(() => {
          setSubmissionStatus(null);
          scrollToTop();
          setTimeout(() => window.location.reload(), 500);
        }, 3000);
      } else {
        setSubmissionStatus("Failed to submit artwork. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting artwork:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("access_token");
        alert("Session expired. Please log in again.");
        window.location.href = "/signin";
      } else {
        setSubmissionStatus("Error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    imageFile,
    animatedArtworks,
    staticArtworks,
    submissionStatus,
    isSubmitting,
    uploadProgress,
    showScrollToTop,
    staticRef,
    scrollToTop,
    handleChange,
    handleFileChange,
    handleSubmit,
    fetchArtworks,
    likeArtwork,
    unlikeArtwork,
  };
};

export default useArtwork;

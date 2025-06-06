#  Creation Demo App

The **Creation Demo App** is a modern web application that allows users to create, view, and interact with user-generated content. Whether it's art, blogs, media, or other digital creations, this platform provides a sleek, responsive, and intuitive interface for showcasing and engaging with creativity.

---

## Features

-  **Content Creation** – Users can submit their own creations with titles, descriptions, and media (e.g., images).
-  **Post Feed** – Browse a dynamic feed of recent creations.
-  **Like/Dislike System** – Interact with posts by liking or disliking them.
-  **Commenting** – Add comments and participate in discussions.
-  **Authentication** – Secure sign-up, login, and token-based session handling.
-  **Media Upload** – Integrated media upload with cloud support (e.g., Cloudinary).
-  **User Profiles** – View user-submitted content and profile information.
-  **Admin Panel** – Manage users and posts (admin only).

---

##  Tech Stack

**Frontend:**
- `React.js`
- `Axios`
- `React Router`
- `Framer Motion` / `WOW` for animations
- `Bootstrap`

**Backend:**
- `Flask (Python)`
- `Flask-JWT-Extended` for Auth
- `SQLAlchemy ORM`
- `Cloudinary API` (media upload)
- `SendGrid API` (email)

**Database:**
- `PostgreSQL` or `SQLite`

---

##  Getting Started

### Prerequisites

- Node.js + npm/yarn
- Python 3.8+
- pip or pipenv
- PostgreSQL or SQLite

---

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
flask db upgrade
flask run

# Stage 1: Build React frontend with pnpm
FROM node:22-bullseye-slim as frontend-builder

WORKDIR /app/frontend

# Copy remaining frontend code
COPY frontend/ /app/frontend/
RUN apt update
RUN apt install -y build-essential

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install frontend dependencies
RUN pnpm install

# Build the frontend
RUN pnpm build


# Stage 2: Build FastAPI backend
FROM python:3.13-slim as backend

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install OS dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY app/ ./app/
COPY migrations/ ./migrations/

COPY config.py* ./

# Copy frontend build into FastAPI app structure
COPY --from=frontend-builder /app/frontend/dist/index.html ./app/templates/index.html
COPY --from=frontend-builder /app/frontend/dist/static ./app/static

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI app (make sure fastapi CLI is installed)
CMD ["fastapi", "run"]

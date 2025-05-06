import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_rtk import FastAPIReactToolkit

logging.basicConfig(format="%(asctime)s:%(levelname)s:%(name)s:%(message)s")
logging.getLogger().setLevel(logging.INFO)


async def on_startup(app: FastAPI):
    if not await toolkit.security.get_user("admin"):
        await toolkit.security.create_user(
            "admin",
            "admin@admin.com",
            "admin",
            "admin",
            "admin",
            roles=["Admin"],
        )


app = FastAPI(docs_url="/openapi/v1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:6006", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

toolkit = FastAPIReactToolkit(
    create_tables=True,
    on_startup=on_startup,
)
toolkit.config.from_pyfile("./app/config.py")
toolkit.initialize(app)

from .apis import *  # noqa: E402, F403

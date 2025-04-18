from fastapi_rtk import Model
from sqlalchemy import Column, Integer, String


class Example(Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(512), nullable=False)

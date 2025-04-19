from datetime import datetime
from fastapi_rtk import Model
from sqlalchemy import JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column


class AuditMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now()
    )
    # owner_id: Mapped[int] = mapped_column(ForeignKey("ab_user.id"), nullable=False)
    # owner: Mapped[User] = relationship(
    #     "User",
    #     backref="competitions",
    # )


class Competition(Model, AuditMixin):
    __tablename__ = "competitions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[str]
    sport_branches: Mapped[dict] = mapped_column(JSON)

    teams: Mapped[list["Team"]] = relationship(
        "Team",
        back_populates="competition",
    )

    matches: Mapped[list["Match"]] = relationship(
        "Match",
        back_populates="competition",
    )


class Team(Model, AuditMixin):
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[str]
    sport_branch: Mapped[str]
    players: Mapped[dict] = mapped_column(JSON)
    # profile_picture = Mapped[str]

    competition_id: Mapped[int] = mapped_column(
        ForeignKey("competitions.id"), nullable=False
    )
    competition: Mapped["Competition"] = relationship(
        "Competition",
        back_populates="teams",
    )

    matches_as_team_a: Mapped[list["Match"]] = relationship(
        "Match",
        foreign_keys="Match.team_a_id",
        back_populates="team_a",
    )
    matches_as_team_b: Mapped[list["Match"]] = relationship(
        "Match",
        foreign_keys="Match.team_b_id",
        back_populates="team_b",
    )


class Match(Model, AuditMixin):
    __tablename__ = "matches"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[str]
    date: Mapped[datetime]
    sport_branch: Mapped[str]
    status: Mapped[str]
    score_list: Mapped[dict] = mapped_column(JSON)

    competition_id: Mapped[int] = mapped_column(
        ForeignKey("competitions.id"), nullable=False
    )
    competition: Mapped["Competition"] = relationship(
        "Competition",
        back_populates="matches",
    )
    team_a_id: Mapped[int] = mapped_column(ForeignKey("teams.id"), nullable=False)
    team_a: Mapped["Team"] = relationship(
        "Team",
        foreign_keys=[team_a_id],
        back_populates="matches_as_team_a",
    )
    team_b_id: Mapped[int] = mapped_column(ForeignKey("teams.id"), nullable=False)
    team_b: Mapped["Team"] = relationship(
        "Team",
        foreign_keys=[team_b_id],
        back_populates="matches_as_team_b",
    )

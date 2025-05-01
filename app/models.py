from datetime import datetime
import enum
from fastapi_rtk import JSONFileColumns, Model
from sqlalchemy import JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column


class JSONTags(JSONFileColumns):
    cache_ok = True
    pass


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

    def __repr__(self):
        return f"{self.name}"


class Competition(Model, AuditMixin):
    __tablename__ = "competitions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[str]
    sport_branches: Mapped[list[str]] = mapped_column(JSONTags)

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
    sport_branch: Mapped[str]  # Ambil dari Competition

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


class StatusEnum(enum.Enum):
    SCHEDULED = "Scheduled"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class Match(Model, AuditMixin):
    __tablename__ = "matches"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[str]
    date: Mapped[datetime]
    sport_branch: Mapped[str]
    status: Mapped[StatusEnum] = mapped_column(
        default=StatusEnum.SCHEDULED, nullable=False
    )
    score_list: Mapped[dict] = mapped_column(JSON, nullable=True)

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

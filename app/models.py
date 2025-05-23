from datetime import datetime
import enum
from fastapi_rtk import JSONBFileColumns, Model
from sqlalchemy import DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.dialects import postgresql


class JSONTags(JSONBFileColumns):
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

    groups: Mapped[list["Group"]] = relationship(
        "Group",
        back_populates="competition",
    )

    brackets: Mapped[list["Bracket"]] = relationship(
        "Bracket",
        back_populates="competition",
    )

    def __repr__(self):
        return f"{self.name})"



class Team(Model, AuditMixin):
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[str]
    sport_branch: Mapped[str]  # Ambil dari Competition

    players: Mapped[dict] = mapped_column(postgresql.JSONB)
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

    group_id: Mapped[int] = mapped_column(
        ForeignKey("groups.id"), nullable=True
    )
    group: Mapped["Group"] = relationship(
        "Group",
        back_populates="teams",
    )

    def __repr__(self):
        return f"{self.name})"


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
    score_list: Mapped[dict] = mapped_column(postgresql.JSONB, nullable=True)

    competition_id: Mapped[int] = mapped_column(
        ForeignKey("competitions.id"), nullable=False
    )
    competition: Mapped["Competition"] = relationship(
        "Competition",
        back_populates="matches",
    )
    team_a_id: Mapped[int] = mapped_column(ForeignKey("teams.id"), nullable=True)
    team_a: Mapped["Team"] = relationship(
        "Team",
        foreign_keys=[team_a_id],
        back_populates="matches_as_team_a",
    )
    team_b_id: Mapped[int] = mapped_column(ForeignKey("teams.id"), nullable=True)
    team_b: Mapped["Team"] = relationship(
        "Team",
        foreign_keys=[team_b_id],
        back_populates="matches_as_team_b",
    )

    group_id: Mapped[int] = mapped_column(
        ForeignKey("groups.id"), nullable=True
    )
    group: Mapped["Group"] = relationship(
        "Group",
        back_populates="matches",
    )

    def __repr__(self):
        return f"{self.name})"


class Group(Model, AuditMixin):
    __tablename__ = "groups"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    sport_branch: Mapped[str]

    # Composite unique constraint: no two groups with same name in the same sport branch
    __table_args__ = (
        UniqueConstraint("name", "sport_branch", name="uq_group_name_sport_branch"),
    )

    competition_id: Mapped[int] = mapped_column(
        ForeignKey("competitions.id"), nullable=False
    )
    competition: Mapped["Competition"] = relationship(
        "Competition",
        back_populates="groups",
    )

    teams: Mapped[list["Team"]] = relationship(
        "Team",
        back_populates="group",
    )

    matches: Mapped[list["Match"]] = relationship(
        "Match",
        back_populates="group",
    )

    def __repr__(self):
        return f"{self.sport_branch} - ({self.name})"

class Bracket(Model, AuditMixin):
    __tablename__ = "brackets"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    sport_branch: Mapped[str]
    knockout_stage_config: Mapped[dict] = mapped_column(postgresql.JSONB, nullable=True)

    competition_id: Mapped[int] = mapped_column(
        ForeignKey("competitions.id"), nullable=False
    )
    competition: Mapped["Competition"] = relationship(
        "Competition",
        back_populates="brackets",
    )

    def __repr__(self):
        return f"{self.id}"
from fastapi_rtk import (
    ModelRestApi,
    QueryManager,
    SQLAInterface,
    db,
    expose,
    permission_name,
    protect,
)

from app.models import Competition, Match, Team
from app.main import toolkit


class CompetitionAPI(ModelRestApi):
    datamodel = SQLAInterface(Competition)
    list_columns = [
        "name",
        "description",
        "sport_branches",
    ]
    add_columns = [
        "name",
        "description",
        "sport_branches",
    ]
    edit_columns = [
        "name",
        "description",
        "sport_branches",
    ]


class TeamAPI(ModelRestApi):
    datamodel = SQLAInterface(Team)
    add_columns = ["competition", "sport_branch", "name", "description", "players"]
    list_columns = [
        "competition",
        "sport_branch",
        "name",
        "players",
    ]
    edit_columns = [
        "competition",
        "sport_branch",
        "name",
        "description",
        "players",
        "profile_picture",
    ]

    @expose("/teams_by_competition/{comp_id}/{sport_branch}", methods=["GET"])
    @protect()
    @permission_name("get")
    async def get_teams_by_competition(self, comp_id: int, sport_branch: str):
        """Get teams by competition ID and sport branch."""
        async with db.session() as session:
            query = QueryManager(self.datamodel)

            teams = await query.get_many(
                session,
                {
                    "where": [
                        ("competition_id", comp_id),
                        ("sport_branch", sport_branch),
                    ],
                    "list_columns": [
                        "id",
                        "name",
                    ],
                },
            )

            return [{"label": team.name, "value": str(team.id)} for team in teams]


class MatchAPI(ModelRestApi):
    datamodel = SQLAInterface(Match)
    add_columns = [
        "competition",
        "sport_branch",
        "team_a",
        "team_b",
        "name",
        "description",
        "status",
        "score_list",
        "date",
    ]
    list_columns = [
        "date",
        "competition",
        "sport_branch",
        "name",
        "status",
        "team_a",
        "team_b",
        "score_list",
    ]


toolkit.add_api(CompetitionAPI)
toolkit.add_api(TeamAPI)
toolkit.add_api(MatchAPI)

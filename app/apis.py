from fastapi_rtk import ModelRestApi, SQLAInterface

from app.models import Competition, Match, Team
from app.main import toolkit


class CompetitionAPI(ModelRestApi):
    datamodel = SQLAInterface(Competition)


class TeamAPI(ModelRestApi):
    datamodel = SQLAInterface(Team)


class MatchAPI(ModelRestApi):
    datamodel = SQLAInterface(Match)


toolkit.add_api(CompetitionAPI)
toolkit.add_api(TeamAPI)
toolkit.add_api(MatchAPI)

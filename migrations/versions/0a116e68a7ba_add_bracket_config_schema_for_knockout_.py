"""Add Bracket Config Schema for knockout stage

Revision ID: 0a116e68a7ba
Revises: d829164b691b
Create Date: 2025-05-23 00:16:08.942461

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import fastapi_rtk.types
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '0a116e68a7ba'
down_revision: Union[str, None] = 'd829164b691b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('brackets',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('sport_branch', sa.String(), nullable=False),
    sa.Column('knockout_stage_config', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
    sa.Column('competition_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['competition_id'], ['competitions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.alter_column('matches', 'score_list',
               existing_type=postgresql.JSON(astext_type=sa.Text()),
               type_=postgresql.JSONB(astext_type=sa.Text()),
               existing_nullable=True)
    op.alter_column('matches', 'team_a_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('matches', 'team_b_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('teams', 'players',
               existing_type=postgresql.JSON(astext_type=sa.Text()),
               type_=postgresql.JSONB(astext_type=sa.Text()),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('teams', 'players',
               existing_type=postgresql.JSONB(astext_type=sa.Text()),
               type_=postgresql.JSON(astext_type=sa.Text()),
               existing_nullable=False)
    op.alter_column('matches', 'team_b_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('matches', 'team_a_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('matches', 'score_list',
               existing_type=postgresql.JSONB(astext_type=sa.Text()),
               type_=postgresql.JSON(astext_type=sa.Text()),
               existing_nullable=True)
    op.drop_table('brackets')
    # ### end Alembic commands ###

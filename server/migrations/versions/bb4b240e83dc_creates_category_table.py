"""creates category table

Revision ID: bb4b240e83dc
Revises: fc9c742ef8aa
Create Date: 2024-06-11 11:47:59.967025

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bb4b240e83dc'
down_revision = 'fc9c742ef8aa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(), nullable=False),
    sa.Column('photos', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('equipment_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['equipment_id'], ['equipments.id'], name=op.f('fk_reviews_equipment_id_equipments')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_reviews_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    # ### end Alembic commands ###

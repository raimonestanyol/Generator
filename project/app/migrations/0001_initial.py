# Generated by Django 3.2 on 2021-04-21 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DataRegistry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amb_t', models.DecimalField(db_column='AMB_T', decimal_places=1, max_digits=3)),
                ('boiler_t', models.DecimalField(db_column='BOILER_T', decimal_places=1, max_digits=3)),
                ('cool_flow', models.DecimalField(db_column='COOL_FLOW', decimal_places=1, max_digits=3)),
                ('cool_t_in', models.DecimalField(db_column='COOL_T_IN', decimal_places=1, max_digits=3)),
                ('cool_t_out', models.DecimalField(db_column='COOL_T_OUT', decimal_places=1, max_digits=3)),
                ('current', models.DecimalField(db_column='CURRENT', decimal_places=2, max_digits=3)),
                ('e_energy', models.PositiveIntegerField(db_column='E_ENERGY')),
                ('e_power', models.SmallIntegerField(db_column='E_POWER')),
                ('heat_t_con', models.DecimalField(db_column='HEAT_T_CON', decimal_places=1, max_digits=4)),
                ('heat_t_lim', models.DecimalField(db_column='HEAT_T_LIM', decimal_places=1, max_digits=4)),
                ('status', models.PositiveIntegerField(db_column='STATUS')),
                ('voltage', models.DecimalField(db_column='VOLTAGE', decimal_places=1, max_digits=4)),
                ('datetime', models.DateTimeField(db_column='DATETIME')),
            ],
            options={
                'db_table': 'data_registry',
                'managed': False,
            },
        ),
    ]
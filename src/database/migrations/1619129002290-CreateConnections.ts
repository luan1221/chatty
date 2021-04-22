import {MigrationInterface, QueryRunner, TableForeignKey, Table} from "typeorm";

export class CreateConnections1619129002290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'connections',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'adminId',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
                    },
                    {
                        name: 'socketId',
                        type: 'varchar'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
        await queryRunner.createForeignKey(
            'connections',
            new TableForeignKey({
                name: 'FKConnectionUser',
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['userId'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL'
            })
        );    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('connections', 'FKConnectionUser');
        await queryRunner.dropTable('connections');
    }

}

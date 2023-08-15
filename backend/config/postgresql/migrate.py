import psycopg2

# Parâmetros de conexão com o banco de dados local
conn_local = {
    'host': 'localhost',
    'port': 5432,
    'database': 'airbnb',
    'user': 'postgres',
    'password': 'Airbnb22'
}

# Parâmetros de conexão com o banco de dados no servidor
conn_servidor = {
    'host': 'containers-us-west-134.railway.app',
    'port': 7241,
    'database': 'railway',
    'user': 'postgres',
    'password': 'qJVd8Akiv4yFGEui5BJ9'
}


def migrate_structure_changes():
    # Conecta ao banco de dados local e obtém todas as tabelas
    local_conn = psycopg2.connect(**conn_local)
    local_cursor = local_conn.cursor()

    local_cursor.execute(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
    tables = local_cursor.fetchall()

    # Conecta ao banco de dados no servidor
    server_conn = psycopg2.connect(**conn_servidor)
    server_cursor = server_conn.cursor()

    # Cria as tabelas no banco de dados do servidor
    for table_name in tables:
        try:
            table_name = table_name[0]
            create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} (LIKE {table_name} INCLUDING CONSTRAINTS)"
            server_cursor.execute(create_table_query)
            server_conn.commit()
        except Exception as e:
            print(table_name, e)
            pass
        finally:
            try:
                server_conn.close()
            except:
                pass

    # Copia os dados das tabelas do banco de dados local para o servidor
    # for table_name in tables:
    #     table_name = table_name[0]
    #     copy_data_query = f"COPY {table_name} FROM STDIN WITH CSV DELIMITER ','"
    #     local_cursor.copy_expert(
    #         f"COPY {table_name} TO STDOUT WITH CSV DELIMITER ','", server_conn)
    #     server_conn.commit()

    # Fecha as conexões
    local_cursor.close()
    local_conn.close()
    server_cursor.close()
    server_conn.close()


def migrate_data():
    # Criar um cursor para executar comandos SQL
    cur_local = conn_local.cursor()
    cur_servidor = conn_servidor.cursor()

    # Copiar os dados da tabela local para um arquivo temporário
    with open('temp_file.csv', 'w') as f:
        cur_local.copy_to(f, 'nome_da_tabela')

    # Copiar os dados do arquivo temporário para a tabela no servidor
    with open('temp_file.csv', 'r') as f:
        cur_servidor.copy_from(f, 'nome_da_tabela')

    # Confirmar as alterações no banco de dados no servidor
    conn_servidor.commit()

    # Fechar as conexões
    cur_local.close()
    cur_servidor.close()
    conn_local.close()
    conn_servidor.close()

from utils.sql_commands import select_command


def removeLastWordOfString(word, str):
    aux = str.split()
    if (aux[-1] == word):
        return ''.join(str).rsplit(' ', 1)[0]
    else:
        return ''.join(str)


columnDict = {
    "room_id": {
        "type": "string",
        "label": "Código Identificar da Acomodação",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "host_id": {
        "type": "string",
        "label": "Código Identificador do Anfitrião (do Hotel para Booking)",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "price": {
        "type": "number",
        "label": "Preço",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },

    "name": {
        "type": "string",
        "label": "Nome",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },

    "latitude": {
        "type": "decimal",
        "label": "Latitude",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "longitude": {
        "type": "decimal",
        "label": "Longitude",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },

    "property_type": {
        "type": "checkbox",
        "label": "Tipo De Propriedade",
        "excludeIn": []
    },
    "room_type": {
        "type": "checkbox",
        "label": "Tipo De Quarto",
        "excludeIn": ["Booking"]
    },
    "minstay": {
        "type": "number",
        "label": "Estadia Minima",
        "excludeIn": ["Booking"]
    },
    "reviews": {
        "type": "number",
        "label": "Quantidade De Reviews",
        "excludeIn": []
    },
    "accommodates": {
        "type": "number",
        "label": "Quantidade De Pessoas Acomodadas",
        "excludeIn": []
    },
    "bedrooms": {
        "type": "number",
        "label": "Quantidade De Quartos",
        "excludeIn": []
    },
    "bathrooms": {
        "type": "number",
        "label": "Quantidade De Banheiros",
        "excludeIn": []
    },
    "bathroom": {
        "type": "string",
        "label": "TipoDe De Banheiro",
        "excludeIn": ["Booking"]
    },
    "extra_host_languages": {
        "type": "string",
        "label": "Idiomas Do Anfitriao",
        "excludeIn": ["Booking"]
    },
    "is_superhost": {
        "type": "radio",
        "label": "E Super Anfitriao",
        "excludeIn": ["Booking"]
    },
    "comodities": {
        "type": "string",
        "label": "Comodidades",
        "excludeIn": []
    },
    "route": {
        "type": "checkbox",
        "label": "Rua",
        "excludeIn": []
    },
    "sublocality": {
        "type": "checkbox",
        "label": "Bairro",
        "excludeIn": []
    },
    "locality": {
        "type": "checkbox",
        "label": "Cidade",
        "excludeIn": []
    },
    "avg_rating": {
        "type": "number",
        "label": "Classificação Média",
        "excludeIn": []
    },
    "location_id": {
        "type": "checkbox",
        "label": "Código Identificador da Localização",
        "excludeIn": []
    },
    "ss_id": {
        "type": "string",
        "label": "Código Identificador da Pesquisa",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "city": {
        "type": "string",
        "label": "Cidade",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "status": {
        "type": "string",
        "label": "Status",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "logs": {
        "type": "string",
        "label": "Logs",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "date": {
        "type": "string",
        "label": "Data da Pesquisa",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "platform": {
        "type": "checkbox",
        "label": "Plataforma",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },

    "survey_qtd": {
        "type": "display-only",
        "label": "Quantidade de Pesquisas",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "last_updated": {
        "type": "display-only",
        "label": "Última atualização em",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },

    "user_id": {
        "type": "string",
        "label": "Código Identificador do Usuário",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "email": {
        "type": "string",
        "label": "E-mail",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "password": {
        "type": "string",
        "label": "Senha",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
    "permission": {
        "type": "string",
        "label": "Nível de Permissão",
        "excludeIn": ["Airbnb", "Booking", "both"]
    },
}

statusDict = {
    "PESQUISAR_CIDADE_AIRBNB": [0, 1, -1, 11, -11, 3, -3, 200, 19],
    "PESQUISAR_CIDADE_BOOKING": [0, 1, -1, 11, -11, 3, -3, 73, 6, 7, -7, 711, -711, 200, 719],
    "PESQUISAR_BAIRRO_AIRBNB": [4, -4, 41, 42, -41, -42],
    "PESQUISAR_BAIRRO_BOOKING": [4, -4, 41, 42, -41, -42, 74, -74, 741, 742, -741, -742],
    "PESQUISAR_RUA_AIRBNB": [5, -5, 43, 51, -51, 82, -82, 81, -81],
    "PESQUISAR_RUA_BOOKING": [5, -5, 43, 51, -51, 82, -82, 81, -81, 75, -75, 743, 751, -751, 782, -782, 781, -781]
}

# SQL SCRIPTS


def get_airbnb_rooms_by_ss_id(ss_id, aggregation_method='_avg'):
    return """SELECT * from rooms{aggregation_method} 
							WHERE
								survey_id in (
									select
										distinct(survey_id) as survey_id
									from
										survey
									where
										ss_id = {ss_id}
								)
								AND platform = 'Airbnb'
							ORDER BY locality, sublocality, route, location_id, room_id""".format(ss_id=ss_id, aggregation_method=aggregation_method)


def get_airbnb_rooms_by_locality(locality, aggregation_method='_avg'):
    return """SELECT * from rooms{aggregation_method} 
							WHERE
								locality = {locality}
								AND platform = 'Airbnb'
							ORDER BY locality, sublocality, route, location_id, room_id""".format(locality=locality, aggregation_method=aggregation_method)


def get_booking_rooms_by_ss_id(ss_id, aggregation_method='_avg'):
    return """SELECT * from rooms{aggregation_method} 
							WHERE
								survey_id in (
									select
										distinct(survey_id) as survey_id
									from
										survey
									where
										ss_id = {ss_id}
								)
								AND platform = 'Booking'
							ORDER BY locality, sublocality, route, location_id, room_id""".format(ss_id=ss_id, aggregation_method=aggregation_method)


def get_all_rooms_by_ss_id(ss_id, platform="'Airbnb' or platform = 'Booking'", aggregation_method='_avg'):
    s_ids = select_command(sql_script="""SELECT distinct(survey_id) from survey where ss_id = %s""",
                           params=(ss_id,),
                           initial_message="Selecting status from super survey",
                           failure_message="Failed to select status for super survey")

    query = 'and'
    if (s_ids and len(s_ids) > 0):
        for s_id in s_ids:
            query = "{query}{x}".format(query=query,
                x=" (strpos(test.surve_id, '{s},') <> 0) or".format(s=s_id[0]))
    query = removeLastWordOfString('or', query)
    query = removeLastWordOfString('and', query)

    return """SELECT * from test
							  WHERE platform = {platform} {query}
							ORDER BY locality, sublocality, route, location_id, room_id""".format(ss_id=ss_id, query=query, platform=platform, aggregation_method=aggregation_method)


def get_all_rooms_by_locality(locality, platform="'Airbnb' or platform = 'Booking'", aggregation_method='_avg'):
    return """SELECT * from rooms{aggregation_method} 
							WHERE
								locality = {locality}
								AND platform = {platform}
							ORDER BY locality, sublocality, route, location_id, room_id""".format(locality=locality, platform=platform, aggregation_method=aggregation_method)


def deprecated_get_airbnb_rooms_by_ss_id(ss_id):
    return """SELECT
							room_id,
							STRING_AGG(DISTINCT CAST(host_id AS varchar), ' JOIN ') AS host_id,
							STRING_AGG(DISTINCT name, ' JOIN ') AS name,
							STRING_AGG(DISTINCT property_type, ' JOIN ') AS property_type,
							STRING_AGG(DISTINCT room_type, ' JOIN ') AS room_type,
							AVG(price) AS price,
							AVG(minstay) AS minstay,
							AVG(reviews) AS reviews,
							AVG(avg_rating) AS avg_rating,
							AVG(accommodates) AS accommodates,
							AVG(bedrooms) AS bedrooms,
							AVG(bathrooms) AS bathrooms,
							STRING_AGG(DISTINCT bathroom, ' JOIN ') AS bathrooms,
							MAX(latitude) AS latitude,
							MAX(longitude) AS longitude,
							STRING_AGG(DISTINCT extra_host_languages, 'JOIN ') AS extra_host_languages,
							AVG(CAST(is_superhost AS int)) AS is_superhost,
							STRING_AGG(DISTINCT comodities, ' JOIN ') AS comodities,
							location.location_id,
							location.route,
							location.sublocality,
							location.locality,
							'Airbnb' as platform,
							case
									when strpos(STRING_AGG(DISTINCT bathroom, 'JOIN '), 'shared') <> 0
										then 'shared'
									when strpos(STRING_AGG(DISTINCT bathroom, 'JOIN '), 'private') <> 0
										then 'private'
										else  null
									end
							as bathrooms
						FROM
							room
					INNER JOIN location
					ON location.location_id = room.location_id
				INNER JOIN survey
					ON survey.survey_id = room.survey_id
				WHERE room.survey_id in ( select distinct(survey_id) as survey_id from survey where ss_id = {ss_id} )
						GROUP BY
							locality, location.sublocality, location.route, location.location_id, room_id, bathroom
				""".format(ss_id=ss_id)


def deprecated_get_booking_rooms_by_ss_id(ss_id):
    return """SELECT
							room_id,
							STRING_AGG(DISTINCT hotel_name, ' JOIN ') AS name,
							STRING_AGG(DISTINCT room_name, ' JOIN ') AS hotel_name,
							STRING_AGG(DISTINCT property_type, ' JOIN ') AS property_type,
							STRING_AGG(DISTINCT room_type, ' JOIN ') AS room_type,
							AVG(price) AS price,
							AVG(reviews) AS reviews,
							AVG(overall_satisfaction) AS avg_rating,
							AVG(accommodates) AS accommodates,
							AVG(bedrooms) AS bedrooms,
							AVG(bathrooms) AS bathrooms,
							MAX(latitude) AS latitude,
							MAX(longitude) AS longitude,
							STRING_AGG(DISTINCT comodities, ' JOIN ') AS comodities,
							location.location_id,
							location.route,
							location.sublocality,
							location.locality,
							'Booking' as platform
						FROM
							booking_room as b
					INNER JOIN location
					ON location.location_id = b.location_id
				INNER JOIN survey
					ON survey.survey_id = b.survey_id
				WHERE b.survey_id in ( select distinct(survey_id) as survey_id from survey where ss_id = {ss_id} )
						GROUP BY
							locality, location.sublocality, location.route, location.location_id, room_id
				""".format(ss_id=ss_id)

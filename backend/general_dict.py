columnDict = {
		"room_id": { "type": "string", "label": "Código Identificar da Acomodação", "excludeIn": [] },
		"host_id": { "type": "string", "label": "Código Identificar do Anfitriao", "excludeIn": [] },
		"price": { "type": "number", "label": "Preço", "excludeIn": [] },
		
		"name": { "type": "string", "label": "Nome", "excludeIn": ["Booking"] },
		"hotel_name": { "type": "string", "label": "Nome do hotel", "excludeIn": ["Airbnb"] },
		
		"latitude": { "type": "decimal", "label": "Latitude", "excludeIn": [] },
		"longitude": { "type": "decimal", "label": "Longitude", "excludeIn": [] },
		"property_type": { "type": "checkbox", "label": "Tipo De Propriedade", "excludeIn": [] },
		"room_type": { "type": "checkbox", "label": "Tipo De Quarto", "excludeIn": ["Booking"] },
		"minstay": { "type": "number", "label": "Estadia Minima", "excludeIn": ["Booking"] },
		"reviews": { "type": "number", "label": "Quantidade De Reviews", "excludeIn": [] },
		"accommodates": { "type": "number", "label": "Quantidade De Pessoas Acomodadas", "excludeIn": [] },
		"bedrooms": { "type": "number", "label": "Quantidade De Quartos", "excludeIn": [] },
		"bathrooms": { "type": "number", "label": "Quantidade De Banheiros", "excludeIn": [] },
		"bathroom": { "type": "string", "label": "TipoDe De Banheiro", "excludeIn": ["Booking"] },
		"extra_host_languages": { "type": "string", "label": "Idiomas Do Anfitriao", "excludeIn": ["Booking"] },
		"is_superhost": { "type": "radio", "label": "E Super Anfitriao", "excludeIn": ["Booking"] },
		"comodities": { "type": "string", "label": "Comodidades", "excludeIn": [] },
		"route": { "type": "checkbox", "label": "Rua", "excludeIn": [] },
		"sublocality": { "type": "checkbox", "label": "Bairro", "excludeIn": [] },
		"locality": { "type": "checkbox", "label": "Cidade", "excludeIn": [] },
		"avg_rating": { "type": "number", "label": "Classificação Média", "excludeIn": [] },
		"location_id": { "type": "checkbox", "label": "Código Identificador da Localização", "excludeIn": [] },
		"ss_id": { "type": "string", "label": "Código Identificador da Pesquisa", "excludeIn": ["Airbnb", "Booking", "both"] },
		"city": { "type": "string", "label": "Cidade", "excludeIn": ["Airbnb", "Booking", "both"] },
		"status": { "type": "string", "label": "Status", "excludeIn": ["Airbnb", "Booking", "both"] },
		"logs": { "type": "string", "label": "Logs", "excludeIn": ["Airbnb", "Booking", "both"] },
		"date": { "type": "string", "label": "Data da Pesquisa", "excludeIn": ["Airbnb", "Booking", "both"] },
		"platform": { "type": "checkbox", "label": "Plataforma", "excludeIn": ["Airbnb", "Booking", "both"] },
		"origem": { "type": "checkbox", "label": "Plataforma", "excludeIn": ["Airbnb", "Booking", "both"] },
}

statusDict = {
  "PESQUISAR_CIDADE_AIRBNB": [0, 1, -1, 11, -11, 3, -3],
  "PESQUISAR_CIDADE_BOOKING": [0, 1, -1, 11, -11, 3, -3, 73, 6, 7, -7, 711, -711],
  "PESQUISAR_BAIRRO_AIRBNB": [4, -4, 41, 42, -41, -42],
  "PESQUISAR_BAIRRO_BOOKING": [4, -4, 41, 42, -41, -42, 74, -74, 741, 742, -741, -742],
  "PESQUISAR_RUA_AIRBNB": [5, -5, 43, 51, -51, 82, -82, 81, -81],
  "PESQUISAR_RUA_BOOKING": [5, -5, 43, 51, -51, 82, -82, 81, -81, 75, -75, 743, 751, -751, 782, -782, 781, -781]
}

# SQL SCRIPTS
def get_airbnb_rooms_by_ss_id(ss_id):
	return """SELECT * from rooms 
							WHERE
								survey_id in (
									select
										distinct(survey_id) as survey_id
									from
										survey
									where
										ss_id = {ss_id}
								)
								AND origem = 'Airbnb'
							ORDER BY locality, sublocality, route, location_id, room_id""".format(ss_id=ss_id)

def get_airbnb_rooms_by_locality(locality):
	return """SELECT * from rooms 
							WHERE
								locality = {locality}
								AND origem = 'Airbnb'
							ORDER BY locality, sublocality, route, location_id, room_id""".format(locality=locality)

def get_booking_rooms_by_ss_id(ss_id):
	return """SELECT * from rooms 
							WHERE
								survey_id in (
									select
										distinct(survey_id) as survey_id
									from
										survey
									where
										ss_id = {ss_id}
								)
								AND origem = 'Booking'
							ORDER BY locality, sublocality, route, location_id, room_id""".format(ss_id=ss_id)

def get_booking_rooms_by_locality(locality):
	return """SELECT * from rooms 
							WHERE
								locality = {locality}
								AND origem = 'Booking'
							ORDER BY locality, sublocality, route, location_id, room_id""".format(ss_id=ss_id)

def get_all_rooms_by_ss_id(ss_id, origem="'Airbnb' or origem = 'Booking'"):
	return """SELECT * from rooms 
							WHERE
								survey_id in (
									select
										distinct(survey_id) as survey_id
									from
										survey
									where
										ss_id = {ss_id}
								)
								AND origem = {origem}
							ORDER BY locality, sublocality, route, location_id, room_id""".format(ss_id=ss_id, origem=origem)

def get_all_rooms_by_locality(locality, origem="'Airbnb' or origem = 'Booking'"):
	return """SELECT * from rooms 
							WHERE
								locality = {locality}
								AND origem = {origem}
							ORDER BY locality, sublocality, route, location_id, room_id""".format(locality=locality, origem=origem)

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
							'Airbnb' as origem
						FROM
							room
					INNER JOIN location
					ON location.location_id = room.location_id
				INNER JOIN survey
					ON survey.survey_id = room.survey_id
				WHERE room.survey_id in ( select distinct(survey_id) as survey_id from survey where ss_id = {ss_id} )
						GROUP BY
							locality, location.sublocality, location.route, location.location_id, room_id
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
							'Booking' as origem
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
columnDict = {
    "room_id": { "type": "string", "label": "Código Identificar da Acomodação" },
    "host_id": { "type": "string", "label": "Código Identificar do Anfitriao" },
    "price": { "type": "number", "label": "Preço" },
    "name": { "type": "string", "label": "Nome" },
    "latitude": { "type": "decimal", "label": "Latitude" },
    "longitude": { "type": "decimal", "label": "Longitude" },
    "property_type": { "type": "checkbox", "label": "Tipo De Propriedade" },
    "room_type": { "type": "checkbox", "label": "Tipo De Quarto" },
    "minstay": { "type": "number", "label": "Estadia Minima" },
    "reviews": { "type": "number", "label": "Quantidade De Reviews" },
    "accommodates": { "type": "number", "label": "Quantidade De Pessoas Acomodadas" },
    "bedrooms": { "type": "number", "label": "Quantidade De Quartos" },
    "bathrooms": { "type": "number", "label": "Quantidade De Banheiros" },
    "bathroom": { "type": "string", "label": "TipoDe De Banheiro" },
    "extra_host_languages": { "type": "string", "label": "Idiomas Do Anfitriao" },
    "is_superhost": { "type": "radio", "label": "E Super Anfitriao" },
    "comodities": { "type": "string", "label": "Comodidades" },
    "route": { "type": "checkbox", "label": "Rua" },
    "sublocality": { "type": "checkbox", "label": "Bairro" },
    "locality": { "type": "checkbox", "label": "Cidade" },
    "avg_rating": { "type": "number", "label": "Classificação Média" },
    "location_id": { "type": "checkbox", "label": "Código Identificador da Localização" },


    "ss_id": { "type": "string", "label": "Código Identificador da Pesquisa" },
    "city": { "type": "string", "label": "Cidade" },
    "status": { "type": "string", "label": "Status" },
    "logs": { "type": "string", "label": "Logs" },
    "date": { "type": "string", "label": "Data da Pesquisa" },
    "platform": { "type": "checkbox", "label": "Plataforma" },
}

# SQL SCRIPTS
get_all_airbnb_rooms = """SELECT
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
                            location.locality
                          FROM
                            room
                        INNER JOIN location
                        ON location.location_id = room.location_id
                      INNER JOIN survey
                        ON survey.survey_id = room.survey_id
                      WHERE room.survey_id in ( select distinct(survey_id) as survey_id from survey where ss_id = 1 )
                          GROUP BY
                            locality, location.sublocality, location.route, location.location_id, room_id
                      """
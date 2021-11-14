<p align="center">
  <h1 align="center">AxioWeb API</h1>
</p>

Base URL Dev: https://axioweb-real-estate.herokuapp.com/

## Get estates
Endpoit para obtener todos los inmuebles 

### Headers
```
Path: /AxioWeb/estate
Methos: GET
Headers: {
    Accept: "application/json",
  "Content-Type": "application/json"
}
```

### Response success
```
[
    {
        "imgs": {
            "id_media": "AxioWeb/yjxbnzohzfq9xqydwp6k",
            "media": "http://res.cloudinary.com/duytv65yt/image/upload/v1636847674/AxioWeb/yjxbnzohzfq9xqydwp6k.jpg"
        },
        "details": {
            "terrain": "1,253",
            "preserved": "Excelente",
            "service_room": true,
            "rooms": 4,
            "floors": 3,
            "parking": 2,
            "construction": "1,850",
            "old_estate": "11",
            "bathrooms": "6.5",
            "maintenance": "0"
        },
        "location": {
            "type": "Point",
            "coordinates": [
                20.2742,
                -104.2697
            ]
        },
        "_id": "6190503b16bfd629de220ad8",
        "key": "OISIFUoiaody783te",
        "name": "Jardines del sur 1",
        "description": "Casa en jardines del sur",
        "price": "1000000",
        "estate_type": "HOUSE",
        "estate_status": "SALE",
        "status": "SALE",
        "areas": [
            "Bodega"
        ],
        "equipped": [
            "Cisterna"
        ],
        "createdAt": "2021-11-13T23:54:35.224Z",
        "updatedAt": "2021-11-13T23:54:35.224Z",
        "__v": 0
    },
    {
        "imgs": {
            "id_media": "AxioWeb/vjbb0bzwcbgpqty847af",
            "media": "http://res.cloudinary.com/duytv65yt/image/upload/v1636847683/AxioWeb/vjbb0bzwcbgpqty847af.jpg"
        },
        "details": {
            "terrain": "1,253",
            "preserved": "Excelente",
            "service_room": true,
            "rooms": 4,
            "floors": 3,
            "parking": 2,
            "construction": "1,850",
            "old_estate": "11",
            "bathrooms": "6.5",
            "maintenance": "0"
        },
        "location": {
            "type": "Point",
            "coordinates": [
                20.2742,
                -104.2697
            ]
        },
        "_id": "6190504316bfd629de220ada",
        "key": "OISIFUoiaody783te",
        "name": "Jardines del sur 2",
        "description": "Casa en jardines del sur",
        "price": "1000000",
        "estate_type": "HOUSE",
        "estate_status": "SALE",
        "status": "SALE",
        "areas": [
            "Bodega"
        ],
        "equipped": [
            "Cisterna"
        ],
        "createdAt": "2021-11-13T23:54:43.494Z",
        "updatedAt": "2021-11-13T23:54:43.494Z",
        "__v": 0
    },
    {
        "imgs": {
            "id_media": "AxioWeb/gq9apb7isquq5ncjjf6u",
            "media": "http://res.cloudinary.com/duytv65yt/image/upload/v1636847692/AxioWeb/gq9apb7isquq5ncjjf6u.jpg"
        },
        "details": {
            "terrain": "1,253",
            "preserved": "Excelente",
            "service_room": true,
            "rooms": 4,
            "floors": 3,
            "parking": 2,
            "construction": "1,850",
            "old_estate": "11",
            "bathrooms": "6.5",
            "maintenance": "0"
        },
        "location": {
            "type": "Point",
            "coordinates": [
                20.2742,
                -104.2697
            ]
        },
        "_id": "6190504d16bfd629de220adc",
        "key": "OISIFUoiaody783te",
        "name": "Jardines del sur 3",
        "description": "Casa en jardines del sur",
        "price": "1000000",
        "estate_type": "HOUSE",
        "estate_status": "SALE",
        "status": "SALE",
        "areas": [
            "Bodega"
        ],
        "equipped": [
            "Cisterna"
        ],
        "createdAt": "2021-11-13T23:54:53.212Z",
        "updatedAt": "2021-11-13T23:54:53.212Z",
        "__v": 0
    }
]
```
## Get estate
Endpoint para obtener un inmueble en especifico a traves del ID
### Headers
```
Path: /AxioWeb/estate/id
Methos: GET
Headers: {
    Accept: "application/json",
  "Content-Type": "application/json"
}
```
### Response success
```
{
    "imgs": {
        "id_media": "AxioWeb/yjxbnzohzfq9xqydwp6k",
        "media": "http://res.cloudinary.com/duytv65yt/image/upload/v1636847674/AxioWeb/yjxbnzohzfq9xqydwp6k.jpg"
    },
    "details": {
        "terrain": "1,253",
        "preserved": "Excelente",
        "service_room": true,
        "rooms": 4,
        "floors": 3,
        "parking": 2,
        "construction": "1,850",
        "old_estate": "11",
        "bathrooms": "6.5",
        "maintenance": "0"
    },
    "location": {
        "type": "Point",
        "coordinates": [
            20.2742,
            -104.2697
        ]
    },
    "_id": "6190503b16bfd629de220ad8",
    "key": "OISIFUoiaody783te",
    "name": "Jardines del sur 1",
    "description": "Casa en jardines del sur",
    "price": "1000000",
    "estate_type": "HOUSE",
    "estate_status": "SALE",
    "status": "SALE",
    "areas": [
        "Bodega"
    ],
    "equipped": [
        "Cisterna"
    ],
    "createdAt": "2021-11-13T23:54:35.224Z",
    "updatedAt": "2021-11-13T23:54:35.224Z",
    "__v": 0
}
```
## Create estate
Endpoint para crear un inmueble

### Headers
```
Path: /AxioWeb/estate
Methos: POST
Headers: {
    Accept: "application/json",
  "Content-Type": "application/json"
}
```
### Body

```
/* Enviar un form-data y en "media" por tipo file y sube una imagen .jpg  */

"key": "OISIFUoiaody783te",
"name": "Jardines del sur 3",
"description": "Casa en jardines del sur",
"price": "1000000",
"estate_type": "HOUSE",
"estate_status": "SALE",
"areas": "Bodega",
"equipped": "Cisterna",
"terrain": "1,253",
"preserved": "Excelente",
"service_room": "true",
"rooms": "4",
"floors": "3",
"parking": "2",
"construction": "1,850",
"old_estate": "11",
"bathrooms": "6.5",
"maintenance": "0",
"coordinates": "20.2742",
"coordinates": "-104.2697",
"type": "Point",
"media":  
```
### Response success
```
{
    "message": "Estate created successfully"
}
```
## Update estate
Endpoint para actualizar un inmueble en especifico a traves del ID

### Headers
```
Path: /AxioWeb/estate/id
Methos: PATCH
Headers: {
    Accept: "application/json",
  "Content-Type": "application/json"
}
```
### Body
```
/* Se maneja el mismo form-data que en el Create estate */
```
### Response success
```
{
    "message": "Estate updated successfully"
}
```
## Update status
Endpoint para actualizar el estatus de un inmueble en especifico a traves del ID
### Headers
```
Path: /AxioWeb/estate/id
Methos: PUT
Headers: {
    Accept: "application/json",
  "Content-Type": "application/json"
}
```
### Response success
```
{
    "message": "Estate updated successfully"
}

```
## Delete estate
Endpoint para eliminar un inmueble en especifico a traves del ID

### Headers
```
Path: /AxioWeb/estate/id
Methos: DELETE
Headers: {
    Accept: "application/json",
  "Content-Type": "application/json"
}
```
### Response success
```
{
    "message": "Estate deleted successfully"
}
```

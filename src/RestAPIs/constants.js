const client_id = "Bv5MK4sZaBxWBg1I3nOWFpsbFCjyv5GZDD6QJC8h"
const client_secret = "LSfoOmDDyW76cxa5pMRW1txwXBj8Nd7I2wuNEx2gs2XiDixMrBsaCGro3DeOwlojdZJzQE5LgPR6SbvUjOsmTiens1X3Vycq19vNKvQjPhJyRISMeonQez50YJWAAJcN"
const grant_type_password = "password"
const grant_type_convert_token = "convert_token"
const backend = "google-oauth2"


export class DjangoApplicationConstants {

    static get client_id(){ return client_id }
    static get client_secret(){ return client_secret }
    static get grant_type_password(){ return grant_type_password }
    static get grant_type_convert_token(){ return grant_type_convert_token }
    static get backend(){ return backend}

}
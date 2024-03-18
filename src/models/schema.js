export const schema = {
    "models": {
        "ShinkUser": {
            "name": "ShinkUser",
            "fields": {
                "bio": {
                    "name": "bio",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "birthDate": {
                    "name": "birthDate",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "datePreference": {
                    "name": "datePreference",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "datePreferenceAgeMax": {
                    "name": "datePreferenceAgeMax",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "datePreferenceAgeMin": {
                    "name": "datePreferenceAgeMin",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "datePreferenceGender": {
                    "name": "datePreferenceGender",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "datePreferenceOrientation": {
                    "name": "datePreferenceOrientation",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "dislikes": {
                    "name": "dislikes",
                    "isArray": true,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "gender": {
                    "name": "gender",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "givenGreenFlags": {
                    "name": "givenGreenFlags",
                    "isArray": true,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "givenRedFlags": {
                    "name": "givenRedFlags",
                    "isArray": true,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "images": {
                    "name": "images",
                    "isArray": true,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "interests": {
                    "name": "interests",
                    "isArray": true,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "isAgreementCompleted": {
                    "name": "isAgreementCompleted",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "isVerified": {
                    "name": "isVerified",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "leftSwipes": {
                    "name": "leftSwipes",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "likes": {
                    "name": "likes",
                    "isArray": true,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "matches": {
                    "name": "matches",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "phoneNumber": {
                    "name": "phoneNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "receivedGreenFlags": {
                    "name": "receivedGreenFlags",
                    "isArray": true,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "receivedRedFlags": {
                    "name": "receivedRedFlags",
                    "isArray": true,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "relationshipStatus": {
                    "name": "relationshipStatus",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reports": {
                    "name": "reports",
                    "isArray": true,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "rightSwipes": {
                    "name": "rightSwipes",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "sexuality": {
                    "name": "sexuality",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "socketInfo": {
                    "name": "socketInfo",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "spotifyMusicInterests": {
                    "name": "spotifyMusicInterests",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "subscriptionInfo": {
                    "name": "subscriptionInfo",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "userId": {
                    "name": "userId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ShinkUsers",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "userId"
                        ]
                    }
                }
            ]
        },
        "UserMessages": {
            "name": "UserMessages",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "from": {
                    "name": "from",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "message": {
                    "name": "message",
                    "isArray": true,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "to": {
                    "name": "to",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "UserMessages",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "id"
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "codegenVersion": "3.4.4",
    "version": "2028399e9411cfcfcd6ae3bb646f7736"
};
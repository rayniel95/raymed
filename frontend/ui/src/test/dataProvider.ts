import localStorageDataProvider from 'ra-data-local-storage';

const dataProvider = localStorageDataProvider({
    defaultData: {
        patients: [
            {"id": 1, "firstName":"Pedro", "secondName":"", "firstLastName": "Perez", "secondLastName": "Rojo", "yearOfBirth": 2004, "monthOfBirth": 3, "dayOfBirth": 1,"ethnicity": "black", "gender": "male"},
            {"id": 2, "firstName":"Pablo", "secondName":"", "firstLastName": "Sanchez", "secondLastName": "Blanco", "yearOfBirth": 1999, "monthOfBirth": 5, "dayOfBirth": 3,"ethnicity": "indian", "gender": "male"},
            {"id": 3, "firstName":"Maria", "secondName":"Paula", "firstLastName": "Riveron", "secondLastName": "Quesada", "yearOfBirth": 2000, "monthOfBirth": 12, "dayOfBirth": 26,"ethnicity": "white", "gender": "female"}
        ],
        doctors: [
            {"id": 1, "firstName": "Juan", "secondName": "Pedro", "firstLastName": "Pablo", "secondLastName":"de la Mar", "specialty": "ginecologia", "email": "juanpedro@gmail.com","phone": "1234434"},
            {"id": 2, "firstName": "Sarmiento", "secondName": "Casado", "firstLastName": "Suarez", "secondLastName":"Gomez", "specialty": "endrocrinologia", "email": "sarmiento_casado@gmail.com","phone": "1234434"},
            {"id": 3, "firstName": "Cirilo", "secondName": "", "firstLastName": "Villa", "secondLastName":"Verde", "specialty": "ortopedia", "email": "cirilo.villa.verde@gmail.com","phone": "1234434"}
        ],
        admins:[
            {"id": 1, "firstName": "Jhon", "secondName": "Paul", "firstLastName": "Smith", "secondLastName": "Carter", "email":"jhonSmith@gmail.com", "phone":"1234345"},
            {"id": 2, "firstName": "Sancho", "secondName": "", "firstLastName": "Panza", "secondLastName": "Cabrera", "email":"sancho.panza@gmail.com", "phone":"7654321"},
            {"id": 3, "firstName": "Quijote", "secondName": "", "firstLastName": "Saveedra", "secondLastName": "Cablijo", "email":"quijote@gmail.com", "phone":"154545466"}
        ],
        drugExposures: [
            {"id": 1, "patientIdentifier": 3, "type": "Aplicacion de vitamina", "startDate": "3/06/2020", "endDate": "1/12/2024", "daysSupply": 33, "lotNumber": 233, "stopReason": "terminado el tratamiento favorablemente"},
            {"id": 2, "patientIdentifier": 2, "type": "Aplicacion de gotas hepaticas", "startDate": "3/06/2015", "endDate": "23/05/2022", "daysSupply": 66, "lotNumber": 123, "stopReason": "culmino el tiempo establecido para el tratamiento"},
            {"id": 3, "patientIdentifier": 1, "type": "Tratamiento con keratina", "startDate": "3/06/2022", "endDate": "10/03/2023", "daysSupply": 55, "lotNumber": 77777, "stopReason": "el paciente realizo una reaccion adversa y se decidio suspender el tratamiento"}
        ],
        notes:[
            {"id": 1, "patientIdentifier": 3, "title": "Analisis clinico", "date": "15/12/2023", "text": "el paciente presenta anorexia"},
            {"id": 2, "patientIdentifier": 2, "title": "Resultado del tratamiento", "date": "24/06/2024", "text": "fue favorable el tratamiento contra la calvicie"},
            {"id": 3, "patientIdentifier": 1, "title": "Analisis de sangre", "date": "01/01/2020", "text": "se realizo un analisis de sangre que dio negativo"}
        ]
    }
});

export default dataProvider;
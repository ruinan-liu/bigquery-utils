/*
Numerical Data Assertions
*/

/*
Telephone number checks
*/
//TEST DONE
function test_telephone_number_digits(colName){
    var result_query = 'LENGTH(' + colName+ ') = 10'
    return result_query
}

//TEST DONE
function test_telephone_number_start_with_zero(colName){
    var result_query = 'SUBSTRING(' + colName + ',1,1) != \'0\''
    return result_query
}

//TODO: DONE
function test_repeated_phone_number(colName){
    var result_query = "TRIM(" + colName +", \"0\")!= \"\" AND " +
    "TRIM(" + colName +", \"1\")!= \"\" AND " + 
    "TRIM(" + colName +", \"2\")!= \"\" AND " +
    "TRIM(" + colName +", \"3\")!= \"\" AND " +
    "TRIM(" + colName +", \"4\")!= \"\" AND " +
    "TRIM(" + colName +", \"5\")!= \"\" AND " +
    "TRIM(" + colName +", \"6\")!= \"\" AND " +
    "TRIM(" + colName +", \"7\")!= \"\" AND " +
    "TRIM(" + colName +", \"8\")!= \"\" AND " +
    "TRIM(" + colName +", \"9\")!= \"\""
    return result_query
}

//TEST DONE
function test_only_contain_digit(colName){
    var result_query = "REGEXP_CONTAINS("+colName+", r'[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')"
    return result_query
}

/*
    Date Data Assertions
*/

//TEST DONE
function test_future_date(colName){
    var result_query = "CAST(" + colName + " AS DATE) < CURRENT_DATE()"
    return result_query
}

//TEST DONE
function test_valid_years(colName){
    var result_query = "DATE_DIFF(CURRENT_DATE(), CAST(" + colName + " AS DATE), YEAR) < 100"
    return result_query
}

//TEST DONE
function test_date_format(colName, date_format){
    try {
        if(date_format == "mm/dd/yyyy" | date_format == "dd/mm/yyyy"){
            var result_query = "REGEXP_CONTAINS(" + colName + ", r'^[0-9]{4}[/][0-9]{2}[/][0-9]{2}$')"
            return result_query
        } else if (date_format == "yyyymmdd"){
            var result_query = "REGEXP_CONTAINS(" + colName + ", r'^[0-9]{4}[0-9]{2}[0-9]{2}$')"
            return result_query
        }
    } catch (error) {
        console.log("Please enter a date format that is 'yyyymmdd', 'mm/dd/yyyy', or 'dd/mm/yyyy'")
        return "Please enter a date format that is 'yyyymmdd', 'mm/dd/yyyy', or 'dd/mm/yyyy'"
    }
}

/*
    String Data Assertions
*/

/* Email Assertions */
//TEST DONE
function test_email_validity(colName){
    var result_query = "REGEXP_CONTAINS(" + colName + ", r\"^[\\w.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$\")"
    return result_query
}

/* Marital Status */
//TEST DONE
function test_marital_status(colName){
    var marital_list = "[\"Married\", \"Single\", \"Divorced\", \"Widowed\"]"
    var result_query = colName + 
    " IN(SELECT marriage_status from UNNEST(" + marital_list+ ") AS marriage_status)"
    return result_query
}

/* Gender check */
//TEST DONE
function test_gender_status(colName){
    var gender_list = "[\"Female\",\"Male\",\"Transgender Female\",\"Transgender Male\",\"Gender Variant\",\"Prefer Not to Say\"]"
    var result_query = colName + 
    " IN(SELECT gender_status from UNNEST(" + gender_list + ") AS gender_status)"
    return result_query
}

/* Name check*/
function test_name_validity(colName){
    var result_query = "REGEXP_CONTAINS(" + colName + ", r\"[a-zA-Z0-9]+\")"
    return result_query
}
module.exports={
    /*
        Exporting numerical data assertions
     */
    test_telephone_number_digits,
    test_telephone_number_start_with_zero,
    test_repeated_phone_number,
    test_only_contain_digit,

    /* 
        Exporting date data assertions
    */
   test_future_date,
   test_valid_years,
   test_date_format,

   /*
        Exporting string data assertions
    */
   test_email_validity,
   test_marital_status,
   test_gender_status,
   test_name_validity
}
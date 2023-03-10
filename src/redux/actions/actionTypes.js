const actionTypes = {
    phoneActions: {
        GET_PHONES_START: "GET_PHONES_START",
        GET_PHONES_SUCCESS: "GET_PHONES_SUCCESS",
        GET_PHONES_FAIL: "GET_PHONES_FAIL",
        DELETE_PHONE_START: "DELETE_PHONE_START",
        DELETE_PHONE_SUCCESS: "DELETE_PHONE_SUCCESS",
        DELETE_PHONE_FAIL: "DELETE_PHONE_FAIL",
        ADD_PHONE: "ADD_PHONE",
        EDIT_PHONE: "EDIT_PHONE",
        DELETE_PHONES_AFTER_DELETE_CATEGORY: "DELETE_PHONES_AFTER_DELETE_CATEGORY",
      },
    categoryActions: {
        GET_CATEGORIES_START: "GET_CATEGORIES_START",
        GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
        GET_CATEGORIES_FAIL: "GET_CATEGORIES_FAIL",
        ADD_CATEGORY: "ADD_CATEGORY",
        DELETE_CATEGORY: "DELETE_CATEGORY",
        EDIT_CATEGORY: "EDIT_CATEGORY"
    },
};

export default actionTypes;
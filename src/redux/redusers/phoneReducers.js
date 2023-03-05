import actionTypes from "../actions/actionTypes"

const initialState = {
    pending: false,
    success: false,
    phones: [],
    fail: false,
    error: "",
};

const phonesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.phoneActions.GET_PHONES_START:
            return {
                ...state,
                pending: true,
            };
        case actionTypes.phoneActions.GET_PHONES_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                phones: action.payload,
            };
        case actionTypes.phoneActions.GET_PHONES_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload,
            };
        case actionTypes.phoneActions.DELETE_PHONE_START:
            return {
                ...state,
                pending: true,
            };
        case actionTypes.phoneActions.DELETE_PHONE_SUCCESS:
            var filteredPhones = state.phones.filter(
                (item) => item.id !== action.payload
            );
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                phones: filteredPhones,
            };
        case actionTypes.phoneActions.DELETE_PHONE_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload,
            };
        case actionTypes.phoneActions.ADD_PHONE:
            return {
                ...state,
                phones: [...state.phones, action.payload],
            };
        case actionTypes.phoneActions.EDIT_PHONE:
            var temp = [];
            for (let i = 0; i < state.phones.length; i++) {
                if (state.phones[i].id !== action.payload.id) {
                    temp.push(state.phones[i]);
                } else {
                    temp.push(action.payload);
                }
            }
            return {
                ...state,
                phones: temp,
            };
        case actionTypes.phoneActions.DELETE_PHONES_AFTER_DELETE_CATEGORY:
            var tempt = state.phones.filter(item => item.categoryId !== action.payload)
             return {
                ...state,
                phones:tempt,
            }

        default:
            return state;
    }
};

export default phonesReducer;
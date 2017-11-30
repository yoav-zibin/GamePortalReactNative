import { initialState, elementObject } from '../store/initial_state';

export const elementReducer = (state = initialState.elements, action) => {
    switch(action.type) {

        case 'RESET_ELEMENTS': {
            return {};
        }


        case 'ADD_ELEMENT': {
            let elementId = action.id;
            let element = action.element;

            if (state.hasOwnProperty(elementId)) {
                return state;
            }

            let updatedElements = Object.assign({}, state);
            updatedElements[elementId] = element;

            return updatedElements;
        }



        case 'ADD_IMAGE_TO_ELEMENT': {
            let elementId = action.elementId;
            let imageIndex = action.index;
            let imageURL = action.url;

            let element = state[elementId];

            if (element.images.hasOwnProperty(imageIndex)) {
                return state;
            }

            let updatedElements = Object.assign({}, state);
            updatedElements[elementId]['images'][imageIndex] = imageURL;

            return updatedElements;
        }

        default:
            return state;
    }
};
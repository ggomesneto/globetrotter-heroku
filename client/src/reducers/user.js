import {
  FETCH_USER,
  PATCH_USER,
  FAIL_REG,
  FAIL_LOG,
  ADD_INFO,
} from "../actions/types";

export default function userReduction(
  state = { failReg: false, failLog: false },
  action
) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.user, failReg: false };
    case FAIL_REG:
      return { ...state, failReg: true };
    case FAIL_LOG:
      return { ...state, failLog: true };
    case PATCH_USER:
      return { ...state, user: action.user };
    case ADD_INFO:
      return { ...state, user: action.user };
    default:
      return { ...state };
  }
}

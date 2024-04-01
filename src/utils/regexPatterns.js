export const namePattern =
  /^[a-zA-Z\u00C0-\u00ff']+([ a-zA-Z\u00C0-\u00ff']+)*$/;
export const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneNumberPattern = /^(\+94)?0?[0-9]{9}$/;
export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
export const nicPattern = /^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$/;

import endpoints from "./endpoints.json";
import { API_BASE_URL } from "../constants";

export function formatDate(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + year;
}

export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + date.getHours() + ':' + date.getMinutes();
}

export function resolveEndpoint(key, slugs = {}) {
  let finalUrl = endpoints[key];
  if (slugs.length) {
    for (let i = 0; i < slugs.length; i++)
      finalUrl = finalUrl.replace(`[slug${i + 1}]`, slugs[i][`slug${i + 1}`])
  }
  return API_BASE_URL + `${finalUrl}`;;
}
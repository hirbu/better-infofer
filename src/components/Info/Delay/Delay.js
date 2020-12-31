import { useAsyncResource } from "use-async-resource";
import { useEffect, useState } from "react";

const fetchDelay = (url) =>
  fetch("/.netlify/functions/delay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      url: url,
    }),
  }).then((data) => data.text());

export default function Delay({ url }) {
  return <span className="no">{delay}</span>;
}

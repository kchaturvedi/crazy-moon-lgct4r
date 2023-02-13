export default async function handler(req, res) {
  const response = await fetch(
    "http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals"
  );
  const data = await response.json();

  res.status(200).json(data)
}

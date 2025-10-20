export default function Cancel() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl text-red-600 font-bold">Payment Cancelled</h1>
      <p className="mt-4">You canceled the payment. Try again later.</p>
    </div>
  );
}

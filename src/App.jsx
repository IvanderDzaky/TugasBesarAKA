import { useState } from "react";

export default function App() {
  const [inputArray, setInputArray] = useState("");
  const [resultArray, setResultArray] = useState([]);
  const [method, setMethod] = useState("iterative");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [executionTime, setExecutionTime] = useState(null);
  const [comparisonLog, setComparisonLog] = useState([]);

  // Fungsi untuk menghapus duplikat secara iteratif
  const removeDuplicatesIterative = (array) => {
    let uniqueArray = [];
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  };

  // Fungsi untuk menghapus duplikat secara rekursif
  const removeDuplicatesRecursive = (array, uniqueArray = []) => {
    if (array.length === 0) {
      return uniqueArray;
    }
    let head = array[0];
    let tail = array.slice(1);
    if (uniqueArray.indexOf(head) === -1) {
      uniqueArray.push(head);
    }
    return removeDuplicatesRecursive(tail, uniqueArray);
  };

  // Fungsi untuk menghapus duplikat sesuai metode yang dipilih
  const handleRemoveDuplicates = () => {
    if (!inputArray.trim()) {
      alert("Masukkan elemen array dengan benar.");
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");
    setExecutionTime(null);

    let array = inputArray.split(",").map((item) => item.trim());
    let uniqueArray = [];

    setTimeout(() => {
      const startTime = performance.now();

      if (method === "iterative") {
        uniqueArray = removeDuplicatesIterative(array);
      } else if (method === "recursive") {
        uniqueArray = removeDuplicatesRecursive(array);
      }

      const endTime = performance.now();
      const timeTaken = endTime - startTime;

      setResultArray(uniqueArray);
      setIsLoading(false);
      setSuccessMessage("Duplikat berhasil dihapus!");
      setExecutionTime(timeTaken.toFixed(2));
    }, 1000);
  };

  // Fungsi untuk membandingkan waktu eksekusi antara metode iteratif dan rekursif
  const handleCompareMethods = () => {
    if (!inputArray.trim()) {
      alert("Masukkan elemen array dengan benar.");
      return;
    }

    setIsLoading(true);
    let array = inputArray.split(",").map((item) => item.trim());

    setTimeout(() => {
      const startTimeIterative = performance.now();
      removeDuplicatesIterative(array);
      const endTimeIterative = performance.now();

      const startTimeRecursive = performance.now();
      removeDuplicatesRecursive(array);
      const endTimeRecursive = performance.now();

      const timeIterative = (endTimeIterative - startTimeIterative).toFixed(2);
      const timeRecursive = (endTimeRecursive - startTimeRecursive).toFixed(2);

      setComparisonLog((prevLog) => [
        ...prevLog,
        { size: array.length, iterative: timeIterative, recursive: timeRecursive },
      ]);

      setIsLoading(false);

      alert(`Iteratif: ${timeIterative} ms\nRekursif: ${timeRecursive} ms`);
    }, 1000);
  };

  // Fungsi untuk menghasilkan angka acak dari 1 hingga 100
  const generateRandomNumbers = (count) => {
    const randomNumbers = Array.from(
      { length: count },
      () => Math.floor(Math.random() * 100) + 1 // Angka acak dari 1 hingga 100
    );
    setInputArray(randomNumbers.join(", "));
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Hapus Duplikat</h1>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows="4"
          placeholder="Masukkan elemen array, pisahkan dengan koma. Contoh: 1, 2, 2, 3"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
        ></textarea>
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => generateRandomNumbers(100)}
          >
            Generate 100
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => generateRandomNumbers(500)}
          >
            Generate 500
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => generateRandomNumbers(1000)}
          >
            Generate 1000
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => generateRandomNumbers(2000)}
          >
            Generate 2000
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => generateRandomNumbers(5000)}
          >
            Generate 5000
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => generateRandomNumbers(10000)}
          >
            Generate 10000
          </button>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Pilih Metode:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="iterative">Iteratif</option>
            <option value="recursive">Rekursif</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          onClick={handleRemoveDuplicates}
          disabled={isLoading}
        >
          {isLoading ? "Memproses..." : "Hapus Duplikat"}
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded w-full hover:bg-purple-600 mt-4"
          onClick={handleCompareMethods}
          disabled={isLoading}
        >
          Bandingkan Waktu
        </button>
        {successMessage && (
          <p className="text-green-600 font-medium mt-4">{successMessage}</p>
        )}
        <h2 className="text-xl font-semibold text-gray-700 mt-4">Hasil:</h2>
        <div className="bg-gray-50 p-4 border border-gray-300 rounded mt-2">
          {resultArray.length > 0 ? (
            <span>{resultArray.join(", ")}</span>
          ) : (
            <span className="text-gray-500">Hasil akan tampil di sini</span>
          )}
        </div>
        {executionTime && (
          <p className="text-gray-600 mt-2">
            Waktu eksekusi: {executionTime} ms
          </p>
        )}
        <h2 className="text-xl font-semibold text-gray-700 mt-4">Log Perbandingan:</h2>
        <div className="bg-gray-50 p-4 border border-gray-300 rounded mt-2">
          {comparisonLog.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Ukuran Array</th>
                  <th className="border p-2">Iteratif (ms)</th>
                  <th className="border p-2">Rekursif (ms)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonLog.map((log, index) => (
                  <tr key={index}>
                    <td className="border p-2">{log.size}</td>
                    <td className="border p-2">{log.iterative}</td>
                    <td className="border p-2">{log.recursive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span className="text-gray-500">Belum ada log perbandingan.</span>
          )}
        </div>
      </div>
    </div>
  );
}
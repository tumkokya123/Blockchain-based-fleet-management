export default function Table({ headers, data }) {
  return (
    <div className="bg-[#141a22] border border-white/5 rounded-2xl overflow-hidden">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="border-b border-white/5">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="p-4 font-medium text-gray-400">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/5">
              {row.map((cell, j) => (
                <td key={j} className="p-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
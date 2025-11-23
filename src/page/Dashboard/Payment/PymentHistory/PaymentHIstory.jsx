import React from "react";
import useAuth from "../../../../hook/useAuth";
import useAxiosSecure from "../../../../hook/useAxios";
import { useQuery } from "@tanstack/react-query";

const PaymentHIstory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:3000/payments?email=${user.email}`
      );
      return res.data.result;
    },
  });

  // {
  //     _id: '692086ee68e7d115df8aa8d2',
  //     amount: 6000,
  //     currency: 'usd',
  //     customerEmail: 'mdriyazakonda@gmail.com',
  //     parcelId: '691f3c514f1a20cd739192d6',
  //     parcelName: 'Desert',
  //     transictionId: 'pi_3SVwNa2OTEi9mGRa0r4Pv8TB',
  //     paymentStatus: 'paid',
  //     paymentA: '2025-11-21T15:36:14.456Z',
  //     trackingId: 'PRCL-20251121-AEC629'
  //   },
  return (
    <div>
      <h1>Payment History: {payments.length}</h1>
      <h2 className="text-2xl md:text-4xl font-bold  text-center mb-6">
        My Payment History
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra overflow-x-auto">
          {/* head */}
          <thead className="bg-primary">
            <tr className="text-center">
              <th className=" border border-gray-400 font-bold text-gray-700">
                No.
              </th>
              <th className=" border border-gray-400 font-bold text-gray-700">
                Name
              </th>
              <th className=" border border-gray-400 font-bold text-gray-700">
                Amount
              </th>
              <th className=" border border-gray-400 font-bold text-gray-700">
                Paid Time
              </th>
              {/* <th className="text-nowrap">Payment Status</th> */}
              <th className="text-nowrap border border-gray-400 font-bold text-gray-700">
                Transiction Id
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((item, index) => {
              return (
                <tr key={item._id} className="text-center">
                  <th className="text-nowrap border border-gray-400">
                    {index + 1}
                  </th>
                  <td className="text-nowrap border border-gray-400">
                    {item.parcelName}
                  </td>
                  <td className="text-nowrap border border-gray-400">
                    ${item.amount}
                  </td>
                  <td className="text-nowrap border border-gray-400">
                    {new Date(item.paymentA).toLocaleString()}
                  </td>
                  {/* <td className="text-nowrap">{item.paymentStatus}</td> */}
                  <td className="text-nowrap border border-gray-400">
                    {item.transictionId}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHIstory;

import React, { useEffect, useState } from 'react';
import { TAddress } from '@/app/lib/definitions';
import { CheckIcon } from '@heroicons/react/24/outline';
import { changeDefaultAddress, getAddressList } from '@/app/lib/actions';

export default function AddressList({
  defaultAddress,
  onShippingAddressChange,
}: {
  defaultAddress: TAddress | null;
  onShippingAddressChange: (address: TAddress, checked: boolean) => void;
}) {
  const [addressList, setAddressList] = useState<TAddress[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAddressList();
      setAddressList(data);
    })();
  }, []);

  return (
    <ul className="min-h-96">
      {addressList.map((address) => (
        <li
          key={address._id}
          className="cursor-pointer border-b py-3"
          onClick={async () => {
            onShippingAddressChange(address, true);
            await changeDefaultAddress(address._id as string);
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold">{address.name}</span>
              <p className="text-sm">{address.phone}</p>
              <div className="text-sm">
                <span>({address.zipcode})</span>
                <span>
                  {address.address}
                  {' ' + address.details}
                </span>
              </div>
            </div>

            <div>{defaultAddress?._id === address._id && <CheckIcon className="h-5 w-5" />}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

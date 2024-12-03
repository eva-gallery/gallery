'use client';

import { AdminGetData } from "../../functions/get.data";
import { useEffect, useState } from 'react';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Wallet {
    walletAddress: string;
    onlineCheck: string;
}

interface ConnectedWalletsProps {
    selectedAccount?: string;
}

const ConnectedWallets = ({ selectedAccount }: ConnectedWalletsProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const [wallets, setWallets] = useState<Wallet[]>([]);

    const fetchWallets = async () => {
        const data = await AdminGetData("admin/wallet");
        setWallets(data);
    };

    useEffect(() => {
        fetchWallets();
    }, []);

    useEffect(() => {
        if (selectedAccount) {
            fetchWallets();
        }
    }, [selectedAccount]);
    return (
        <div className="border border-gray-300 p-2 rounded mb-2"> {/* Changed from p-4 to pl-2 */}
            <div onClick={toggleDropdown}>
                <div>
                    <span> List your connected wallets </span>
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="mr-2 text-gray-600" />

                </div>
            </div>
            {isOpen && (
                <div>
                    {wallets.map((wallet) => (
                        <div key={wallet.walletAddress} className="p-2 bg-gray-100 rounded flex items-center">
                            <FontAwesomeIcon icon={faWallet} className="mr-2 text-gray-600" />
                            <a href={`${wallet.onlineCheck}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                {" " + wallet.walletAddress}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default ConnectedWallets;
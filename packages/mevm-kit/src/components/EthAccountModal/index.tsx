import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useEthProfile } from '../../hooks/useEthProfile';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { ProfileDetails } from '../ProfileDetails/ProfileDetails';

export interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function EthAccountModal({ onClose, open }: AccountModalProps) {
  const { address } = useAccount();
  const { balance, ensAvatar, ensName } = useEthProfile({
    address,
    includeBalance: open,
  });
  const { disconnect } = useDisconnect();

  if (!address) {
    return null;
  }

  const titleId = 'rk_account_modal_title';

  return (
    <>
      {address && (
        <Dialog onClose={onClose} open={open} titleId={titleId}>
          <DialogContent bottomSheetOnMobile padding="0">
            <ProfileDetails
              address={address}
              ensAvatar={ensAvatar}
              ensName={ensName}
              balance={balance}
              onClose={onClose}
              onDisconnect={disconnect}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

import React from 'react';
import { useRecoilState } from 'recoil';
import { requestModal } from '../../atom_selector/recoil.js';
import './modal.css';

var RequestFormModal = () => {
  let [useRequestModal, setRequestModal] = useRecoilState(requestModal);

  const onSubmit = () => {
    setRequestModal(false);
  }

  if(useRequestModal === true) {
    return (
      <div className="modal">
        <div className="modal-content">
            <div className="modal-body">New Service Request
              <input type="text" className="modal-info" placeholder="test1"></input>
              <input type="submit" className="modal-submit" onClick={onSubmit}></input>

            </div>
        </div>
      </div>
    );
  }
};

export default RequestFormModal;
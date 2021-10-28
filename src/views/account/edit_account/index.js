import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import Modal from 'components/ui/Modal';
import Boundary from 'components/ui/Boundary';
import Input from 'components/ui/Input';
import CircularProgress from 'components/ui/CircularProgress';
import ImageLoader from 'components/ui/ImageLoader';

import { isLoading as dispatchIsLoading } from 'actions/appActions';
import { updateProfile } from 'actions/profileActions';
import useFileHandler from 'hooks/useFileHandler';
import {ACCOUNT} from 'constants/routes';

const EditProfile = (props) =>{
    useEffect(()=>{
        return () => {
            dispatch(dispatchIsLoading(false));
        }
    }, [])
    const {Profile, auth, isLoading} = useSelector(state=>({
        profile: state.profile,
        auth: state.auth,
        isLoading: state.app.loading
    }));
    const dispatch = useDispatch();
    const [field, setField] = useState({
        fullname: { value: profile.fullname ? profile.fullname: ''},
        email: { value: profile.email ? profile.email: ''},
        address: { value: profile.address ? profile.address: ''},
        mobile:  profile.mobile.value ? profile.mobile: {
            value: '',
            data: {}
        },
        avatar: profile.avatar ? profile.avatar: '',
        banner: profile.banner ? profile.banner: '',
    });
    const [isOpenModal, setModalOpen] = useState(false);
    const [password, setPassword] = useState(null);
    const {
        imageFile,
        isFileLoading,
        onFileChange
    } = useFileHandler({ avatar: {}, banner: {} });

    return(
        <Boundary>
            <div className="edit-user">
                <h3 className="text-center"> Edit Account Details</h3>
                    <div className="user-profile-banner">
                                <div className="user-profile-banner-wrapper">
                                <ImageLoader
                                    alt="Banner"
                                    className="user-profile-banner-img"
                                    src={imageFile.banner.url || field.banner}
                                />
                                <input
                                accept="image/x-png, image/jpeg"
                                disabled={isLoading}
                                id="edit-banner"
                                hidden
                                onChange={(e) => onFileChange(e, 'banner')}
                                type='file'
                                >
                                </input>
                                {isLoading ? (
                                    <div className="loading-wrapper">
                                        <CircularProgress visible={true} theme="light"/>
                                    </div>
                                ) : (
                                    <label 
                                        className="edit-button edit-banner-button"
                                        htmlFor="edit-banner"
                                    >
                                        <i className="fa fa-pen"/>
                                    </label>
                                )}
                            </div>

                            <div className="user-profile-avatar-wrapper">
                                <ImageLoader
                                    alt=""
                                    className="user-profile-img"
                                    src={imageFile.banner.url || field.banner}
                                />
                                <input
                                accept="image/x-png, image/jpeg"
                                disabled={isLoading}
                                id="edit-avatar"
                                hidden
                                onChange={(e) => onFileChange(e, 'avatar')}
                                type='file'
                                >
                                </input>
                                {isLoading ? (
                                    <div className="loading-wrapper">
                                        <CircularProgress visible={true} theme="light"/>
                                    </div>
                                ) : (
                                    <label 
                                        className="edit-button edit-avatar-button"
                                        htmlFor="edit-avatar"
                                    >
                                        <i className="fa fa-pen"/>
                                    </label>
                                )}
                        </div>
                    </div>
                    <div className="user-profile-details">
                        <Input
                            label="* Full Name"
                            maxLength={40}
                            readOnly={isLoading}
                            placeholder="Your Full Name"
                            onInputChange={onFullNameChange}
                            isRequired={true}
                            field="full-name"
                            style={{ textTransform: "capitalize"}}
                            text="text"
                            value={field.fullname.value}
                        >       
                        </Input>

                        <Input
                            label="* Email"
                            maxLength={40}
                            readOnly={auth.provider !== 'password' || isLoading}
                            placeholder="test@example.com"
                            onInputChange={onEmailChange}
                            isRequired={true}
                            field="email"
                            text="email"
                            value={field.email.value}
                        >  
                        </Input>

                        <Input
                            label="Address"
                            maxLength={120}
                            readOnly={isLoading}
                            placeholder="Give your Address"
                            onInputChange={onAddressChange}
                            isRequired={false}
                            field="address"
                            style={{textTransform: 'capitalize'}}
                            text="text"
                            value={field.address.value}
                        >  
                        </Input>
                        {field.mobile.error ? <span className="input-message">{field.mobile.error}</span>:(
                            <span className="d-block padding-s">Mobile</span>
                        )}
                        <PhoneInput
                            country={'ph'}
                            inputExtraProps={{isRequired: true}}
                            inputClass={`input-form d-block ${field.mobile.error ? 'input-error': ''}`}
                            masks={{'ph':'+... .. ... ...'}}
                            onChange={onMobileChange}
                            disabled={isLoading}
                            readOnly={isLoading}
                            placeholder="Enter Your Mobile Number"
                            value={field.mobile.data.num}
                        />
                        <br/>
                        <div className="edit-user-action">
                            <button
                                className="button button-muted w-100-mobile"
                                disabled={isLoading}
                                onCLick={() => props.history.push(ACCOUNT)}
                            />
                            Back to Profile
                            <button
                                className="button w-100-mobile"
                                disabled={isLoading || !areFieldsChanged()}
                                onCLick={onSubmitUpdate}
                            >
                                <CircularProgress
                                    visible={isLoading}
                                    theme="light"
                                />
                                {isLoading ? 'Updating Profile' : "Update Profile"}
                            </button>
                        </div>    
                    </div>
            </div>
        </Boundary>
    );
};
export default EditProfile;
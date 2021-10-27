import React , {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import firebase from 'firebase';
import {displayDate} from 'helpers/utils';
import {ACCOUNT_EDIT} from 'constants/routes';
import ImageLoader from 'components/ui/ImageLoader';

const UserProfile = (props) =>{
    const profile = userSelector(state => state.profile);
    return(
        <div className="user-profile">
            <div className="user-profile-block">
                <div className="user-profile-banner">
                    <div className="user-profile-wrapper-banner">
                        <ImageLoader
                            alt="Banner"
                            className="user-profile-banner-img"
                            src={profile.banner}
                        />
                    </div>
                    <div className="user-profile-avatar-wrapper">
                        <ImageLoader
                            alt="Avatar"
                            className=""
                            src={profile.avatar}
                        />
                    </div>
                    <button className="button button-small user-profile-edit"
                            onClick={()=> props.history.push(ACCOUNT_EDIT)}
                    >
                        Edit Account
                    </button>
                </div>
                <div className="user-profile-details">
                    <h2 className="user-profile-name">{profile.fullname}</h2>
                    <span>Email</span>
                    <br/>
                    <h5>{profile.email}</h5>
                    <span>Address</span>
                    <br/>
                    {profile.address ? (
                        <h5>{profile.address}</h5>
                    ) : (
                        <h5 className="text-subtle text-italic">Address not Set </h5>
                    )}
                    <span>Mobile</span>
                    <br/>
                    <h5>{profile.mobile.data.num ? profile.mobile.data.num : '+254 '}</h5>
                </div>
            </div>
        </div>
        
    )

}
export default withRouter(UserProfile);
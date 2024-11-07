import React from 'react';
import { AdminGetData } from '../../functions/get.data';
import AdminDetail from '../../components/detail';
import { AdminType } from '../../types';
import { AdminBoolean, AdminHtml, AdminLink, AdminIcon } from '../../components/components';
import AdminImage from '../../components/image';
import { M } from '..';
import AdminInsert from '../../components/insert';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export async function Detail(admin: AdminType) {


    const data = await AdminGetData("admin/nft/" + admin.unique);
    const user = await AdminGetData("admin/user");

    const object = {
        data,
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/admin';

    return (
        <>
            <AdminDetail admin={admin} object={object}>
                <AdminDetail.Row icon="field" name="Name">
                    <strong className='fs-3'>
                        {data.nftData['name']}
                    </strong>
                </AdminDetail.Row>

                <AdminDetail.Row icon="textarea" name="Metadata">
                    <AdminHtml html={data.nftData['metadata']} />
                </AdminDetail.Row>


                <AdminDetail.Row icon="artwork" name="Image">
                    <a href={data.nftData['image']} target='_blank'>
                        <img src={data.nftData['image']} alt={data.nftData['name']} width={480} loading="lazy" />
                    </a>
                </AdminDetail.Row>

                <AdminDetail.Row icon="wallet" name="Wallet">
                    <AdminHtml html={data['walletId']} />
                </AdminDetail.Row>

                <AdminDetail.Row icon="collection" name="Collection">
                    <AdminHtml html={data['collectionId']} />
                </AdminDetail.Row>

                <AdminDetail.Row icon="nft" name="NFT Check">
                    <a href="#">Link to online NFT check service</a>
                </AdminDetail.Row>

            </AdminDetail>



            {user['trialMintId'] == data['id'] ? (
                <>
                    <hr className='my-5' />
                    <AdminDetail.Row icon="trial" name="Trial minted">
                        <M.Nft.Ownership />
                    </AdminDetail.Row>
                </>
            ) : null}

            {data['artwork'] ? (
                <>
                    <hr className='my-5' />
                    <AdminDetail.Row icon="artwork" name="Artwork">
                        <Button as="a" href={`/admin/artwork/detail/${data['artwork'].id}`} className="btn btn-primary">
                            Artwork Detail
                            <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                        </Button>
                    </AdminDetail.Row>
                </>
            ) : null}


        </>
    );
}




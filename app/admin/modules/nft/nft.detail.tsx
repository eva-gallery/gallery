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
import { faArrowRight, faEdit } from '@fortawesome/free-solid-svg-icons';
import NftEdit from './nft.edit';
import NftRemove from './nft.remove';

export async function Detail(admin: AdminType) {

    let data = await AdminGetData("admin/nft/" + admin.unique);
    let colData = await AdminGetData("admin/collection/" + data.collectionId);
    let walData = await AdminGetData("admin/wallet/" + data.walletId);

    //Trial minted NFT
    if (!data.nftData) {
        data = await AdminGetData("admin/trialinfo/nft/" + admin.unique);
        colData = data.collection
        walData = data.wallet
    }
    if (colData.statusCode == 404) {
       let newCol = await AdminGetData("admin/trialinfo/nft/" + admin.unique);
         colData = newCol.collection
    }

    // Some NFTs have collection, but they don't have artwork
    if (data.artwork == undefined){
        data.artwork = {}
    }
    if (colData == undefined || colData.statusCode == 404 || colData.statusCode == 400){
        colData = {}
    }
    const user = await AdminGetData("admin/user");
    const object = {
        data,
    }


    return (

        <>
                <AdminDetail.Row icon="field" name="Name">
                    <strong className='fs-3'>
                        {data.nftData['name']}
                    </strong>
                </AdminDetail.Row>

                <AdminDetail.Row icon="textarea" name="Metadata">
                    <AdminHtml html={data.nftData['description']} />
                </AdminDetail.Row>


                <AdminDetail.Row icon="artwork" name="Image">
                    <a href={data.nftData['image']} target='_blank'>
                        <img src={data.nftData['image']} alt={data.nftData['name']} width={480} loading="lazy" />
                    </a>
                </AdminDetail.Row>

                <AdminDetail.Row icon="wallet" name="Wallet">
                    <a href={walData.onlineCheck} target='_blank' rel="noopener noreferrer">{walData.walletAddress}.</a>
                </AdminDetail.Row>

                {colData && colData.colData && colData.colData.id ? (
                    <AdminDetail.Row icon="collection" name="Collection">
                        <a href={colData.onlineCheck} target='_blank' rel="noopener noreferrer">Collection {colData.colData.id}.</a>
                    </AdminDetail.Row>
                ) : null}
                <AdminDetail.Row icon="nft" name="NFT Check">
                    <a href={data.onlineCheck} target='_blank' rel="noopener noreferrer">Proof of NFT existence.</a>
                </AdminDetail.Row>
                
                    {!(user.trialMintId == data.id) && colData && colData.colData && colData.colData.id && (
                        <NftEdit 
                            description={data.nftData['description']} 
                            name={data.nftData['name']} 
                            id={data.id} 
                            artworkId={data.artwork.id}
                        />
                    )}
                        <NftRemove 
                                description={data.nftData['description']} 
                                name={data.nftData['name']} 
                                id={data.id} 
                                artworkId={data.artwork.id}
                            />

            {user['trialMintId'] == data['id'] && !user['trialMintPaid'] && !user['trialMintClaimed'] ? (
                <>
                    <hr className='my-5' />
                    <AdminDetail.Row icon="trial" name="Trial minted">
                        <M.Nft.Ownership />
                    </AdminDetail.Row>
                </>
            ) : user['trialMintId'] == data['id'] ? (
                <>
                    <hr className='my-5' />
                    <AdminDetail.Row icon="trial" name="Trial minted">
                        Your artwork is already claimed, see the wallet it is associated to.
                    </AdminDetail.Row>
                </>
            ) : null}

            {data['artwork'] && data['artwork'].id ? (
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




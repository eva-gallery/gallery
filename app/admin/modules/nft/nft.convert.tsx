'use client';
import React from 'react';
import { OverlayTrigger, Popover, Button, Alert } from "react-bootstrap";
import AdminDetail from '../../components/detail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faRadiation, faReceipt, faRecordVinyl, faRecycle, faRemove, faTrash, faTrashAlt, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AdminGetData, AdminPostData, AdminPutData } from '../../functions/get.data';
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from "@polkadot/api";

const NftConvert: React.FC<{ description: string; name: string; id: string}> = ({ description, name, id }) => {
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState<any[]>([]);
    const [newName, setNewName] = React.useState(name);
    const [newDescription, setNewDescription] = React.useState(description);

    //Load artists, genres, materials, techniques and worktypes
    React.useEffect(() => {
        (async () => {
            const options = await Promise.all([
                AdminGetData("admin/options/artist"),
                AdminGetData("admin/options/artwork_genre"),
                AdminGetData("admin/options/artwork_worktype"),
                AdminGetData("admin/options/artwork_material"),
                AdminGetData("admin/options/artwork_technique"),
            ]);
            setOptions(options);
        })();
    }, []);

    return (
        <div>
            <hr className='my-5' />
            <AdminDetail.Row icon="artwork" name="Convert NFT to Artwork">
            <div className="d-flex align-items-center">
                <Button 
                    className="btn btn-primary" 
                    onClick={() => {
                        const form = document.getElementById('artwork-form');
                        if (form) {
                            form.style.display = form.style.display === 'none' ? 'block' : 'none';
                        }
                    }}
                >
                    Convert to Artwork
                    <FontAwesomeIcon icon={faRecordVinyl} className="ms-2" />
                </Button>
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Popover id="take-ownership-guide">
                            <Popover.Header as="h3">Converting your artwork</Popover.Header>
                            <Popover.Body>
                                Following button turns your NFT into artwork. The artwork can be displayed in the virtual gallery.
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        className="ms-2"
                    >
                        <span>ⓘ</span>
                    </Button>
                </OverlayTrigger>
            </div>
            <div id="artwork-form" style={{ display: 'none', marginTop: '20px' }}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            defaultValue={name}
                            onChange={(e) => setNewName(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea 
                            className="form-control" 
                            id="description" 
                            defaultValue={description} 
                            rows={3}
                            onChange={(e) => setNewDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="artist" className="form-label">Artist</label>
                        <select className="form-control" id="artist">
                            <option value="">Select artist</option>
                            {options[0] && options[0].map((artist: any) => (
                                <option key={artist.id} value={artist.id}>{artist.name}</option>
                            ))}
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={async (e) => {
                            e.preventDefault();
                            const artist = (document.getElementById('artist') as HTMLSelectElement).value;

                            if (!newName || !newDescription || !artist) {
                                alert('Fields name, description and artist are required, please provide them.');
                                setLoading(false);
                                return;
                            }
                            setLoading(true);

                            try{
                              await AdminPostData("admin/artwork/nft/create", { name: newName, description: newDescription, artistId: artist, nftId: id})
                              alert("Artwork created successfully");
                                setLoading(false);
                                window.location.reload();
                            } catch (error) {
                                alert("Error creating artwork");
                                setLoading(false);
                            }
                        }}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="ms-2">Creating artwork...</span>
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                    <OverlayTrigger
                    placement="right"
                    overlay={
                        <Popover id="take-ownership-guide">
                            <Popover.Header as="h3">Turn your NFT into artwork</Popover.Header>
                            <Popover.Body>
                                Clicking this button will create an artwork from your NFT. The artwork can be displayed in the virtual gallery.
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        className="ms-2"
                    >
                        <span>ⓘ</span>
                    </Button>
                </OverlayTrigger>
                </form>
            </div>
            </AdminDetail.Row>
        </div>
    );
};

export default NftConvert;
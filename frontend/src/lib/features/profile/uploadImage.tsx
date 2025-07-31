import { apiProfileUpload } from '@/features/profile/api/apiUrlProfile';
import axios from 'axios';
import Cookies from 'js-cookie';

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const token = Cookies.get('token')
    const res = await axios.post(apiProfileUpload, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    })

    return res.data.image_path as string
}
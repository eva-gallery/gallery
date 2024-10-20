
import { F } from '@/app/framework';
import { ViktorType } from '@/app/viktor/@api/types';

async function viktorGetData(viktor: ViktorType) {

    let dataX = new F.dataX(viktor.module);
    await dataX.getData({    
        parents: true,    
        deleted: false
    });

    return dataX.objects;
}

export { viktorGetData };

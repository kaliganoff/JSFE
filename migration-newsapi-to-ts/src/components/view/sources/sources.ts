import './sources.css';
import { Source } from 'interfaces';

class Sources {
    draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: Source) => {
            if (sourceItemTemp) {
                const sourceClone: HTMLElement = sourceItemTemp.content.cloneNode(true) as HTMLElement;
                const sourceItemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
                if (sourceItemName) {
                    sourceItemName.textContent = item.name;
                }
                sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;

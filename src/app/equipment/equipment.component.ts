import { Component, OnInit, Pipe, PipeTransform } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SyncService } from '../shared/sync.service'
import { ActivatedRoute, RouterModule } from '@angular/router'
import {
    Observable,
    defaultIfEmpty,
    filter,
    forkJoin,
    from,
    map,
    switchMap,
    tap,
} from 'rxjs'
import {
    IEquipmentEntry,
    IEquipmentFields,
    IEquipmentTypeEntry,
    IEquipmentTypeFields,
} from '../shared/contentful'
import { IonicModule } from '@ionic/angular'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import {
    AssetLinkBlock,
    BLOCKS,
    Block,
    Document,
    Inline,
    Node,
    Text,
} from '@contentful/rich-text-types'

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterModule],
})
export class EquipmentComponent implements OnInit {
    public equipmentName$!: Observable<string>
    public equipmentBody$!: Observable<string>
    public equipment$!: Observable<IEquipmentEntry>

    constructor(
        private syncService: SyncService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.equipment$ = this.activatedRoute.paramMap.pipe(
            map((params) => params.get('id')),
            filter(Boolean),
            switchMap((id) => this.syncService.getEntry<IEquipmentFields>(id)),
        )

        this.equipmentBody$ = this.equipment$.pipe(
            map((equipment) => equipment.fields.body),
            switchMap((body) => {
                const embeddedAssetNodes: AssetLinkBlock[] = []
                function checkContentOfNode(node: Block | Inline) {
                    if (node.nodeType === BLOCKS.EMBEDDED_ASSET) {
                        embeddedAssetNodes.push(node as AssetLinkBlock)
                    } else {
                        node?.content?.forEach((node) => {
                            checkContentOfNode(node as Block | Inline)
                        })
                    }
                }
                checkContentOfNode(body)
                return forkJoin(
                    embeddedAssetNodes
                        .map((node) => node.data.target.sys.id)
                        .map((assetId) =>
                            this.syncService
                                .getAsset(assetId)
                                .pipe(
                                    map((assetValue): [string, string] => [
                                        assetId,
                                        assetValue,
                                    ]),
                                ),
                        ),
                ).pipe(
                    defaultIfEmpty([] as [string, string][]),
                    map((assets) => new Map(assets)),
                    map((assetsMap) => {
                        return documentToHtmlString(body, {
                            renderNode: {
                                [BLOCKS.EMBEDDED_ASSET]: (node) => {
                                    if (
                                        node.nodeType !== BLOCKS.EMBEDDED_ASSET
                                    ) {
                                        return ''
                                    }

                                    const assetNode = node as AssetLinkBlock

                                    const assetId = assetNode.data.target.sys.id
                                    const assetImg = assetsMap.get(assetId)

                                    return `<img src=${assetImg}>`
                                },
                            },
                        })
                    }),
                )
            }),
        )

        this.equipmentName$ = this.equipment$.pipe(
            map((equipment) => equipment.fields.name),
        )
    }

    public getHtmlString(doc: Document | null) {
        if (doc === undefined || doc === null || doc.nodeType !== 'document') {
            return '<p></p>'
        }

        return documentToHtmlString(doc)
    }
}

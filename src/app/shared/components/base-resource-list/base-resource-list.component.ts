import { OnInit } from '@angular/core';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { BaseResourceModel } from '../../../shared/models/base-resources.model';

export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit {
  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) {}

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => {
        this.resources = resources;
      },
      error => alert('Erro ao carregar a lista')
    );
  }

  deleteResource(resource) {
    const mustDelete = confirm('Deseja excluir este item?');

    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () =>
          (this.resources = this.resources.filter(
            element => element !== resource
          )),
        () => alert('Erro ao tentar excluir!')
      );
    }
  }
}

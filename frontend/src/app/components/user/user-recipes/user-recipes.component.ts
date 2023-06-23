import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../../../models/recipe-model";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {HttpClient} from "@angular/common/http";
import {UserRecipeService} from "../../../services/user-recipe/user-recipe.service";
import {NotificationService} from "../../../services/notifications/notification.service";

@Component({
  selector: 'app-all-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit{
  currentPage: number = 0;
  pageSize: number = 9;
  totalItems: number = 0;
  totalPages: number = 0;
  paginatedList: any[] = [];
  totalPagesArray: number[] = [];


  constructor(private userRecipeService: UserRecipeService, private notificationService:NotificationService) {}

  ngOnInit() {
    this.getPaginatedData();
  }

  deleteRecipe(id:number){
    console.log("delete recipe")
    this.userRecipeService.updateRecipeDeletion(id,{isDeleted:true}).subscribe(response=>{
      this.notificationService.showNotification("Recipe Deleted Successfully")
      this.getPaginatedData();
    }, error => {
     this.notificationService.showErrorNotification("Failed to delete recipe")
    })
  }

  getPaginatedData() {
    const params = {
      page: this.currentPage.toString(),
      size: this.pageSize.toString()
    };

    this.userRecipeService.getPaginationUserRecipes(1,params).subscribe((response: any) => {
      this.paginatedList = response.data;
      this.totalItems = response.totalItems;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i );
      console.log(response.data)

    });
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 0 && pageNumber < this.totalPages) {
      this.currentPage = pageNumber;
      this.getPaginatedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPaginatedData();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getPaginatedData();
    }
  }
}

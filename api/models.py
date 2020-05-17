from django.db import models
from django.urls import reverse

class Author(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def get_absolute_url(self):
        return reverse('author-detail', args=[str(self.id)])
    
    def __str__(self):
        return '%s, %s' % (self.last_name, self.first_name)


class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    year_of_creating = models.IntegerField()

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('book-detail', args=[str(self.id)])
        
           
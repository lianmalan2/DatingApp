using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(
            this HttpResponse response,
            int currentPage,
            int itemsPerPAge,
            int totalItems,
            int totalPages)
        {
            var header = new PaginationHeader(currentPage, itemsPerPAge, totalItems, totalPages);
            response.Headers.Add("Pagination", JsonSerializer.Serialize(header));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}

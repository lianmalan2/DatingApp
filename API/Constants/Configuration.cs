using System.Text.Json;

namespace API.Constants
{
    public static class Configuration
    {
        public static JsonSerializerOptions JsonSerializerOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
        };
    }
}
